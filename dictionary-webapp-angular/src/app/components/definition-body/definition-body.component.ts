import { Component, OnInit } from '@angular/core';
import { WordRequestService } from '../../services/word-request.service';
import { WordResponse } from '../../interfaces/word-response';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorResponse } from 'src/app/interfaces/error-response';

@Component({
  selector: 'app-definition-body',
  templateUrl: './definition-body.component.html',
  styleUrls: ['./definition-body.component.scss']
})
export class DefinitionBodyComponent implements OnInit {
  constructor(private wordRequest: WordRequestService, private activatedRoute: ActivatedRoute, private spinner: NgxSpinnerService) { }
  wordResponse !: Array<WordResponse>;
  wordTitle !: string;
  wordFromParam !: string;
  wordErrorRespone !: ErrorResponse | undefined;
  async ngOnInit(): Promise<void> {

    this.activatedRoute.paramMap.subscribe(async (param) => {
      this.wordFromParam = param.get("word") ?? ""
      this.wordErrorRespone = undefined; // reset all properties before each request 
      this.wordResponse = []
      this.wordTitle = ""
      if (this.wordFromParam.length > 0) {
        this.spinner.show('myspinner')
        console.log(this.wordResponse);
        try {
          this.wordResponse = await this.wordRequest.getWordMeaning(this.wordFromParam)
          this.spinner.hide('myspinner')
          this.wordTitle = this.wordResponse[0].word
        } catch (error: any) {
          this.wordErrorRespone = error.error
          console.log(this.wordErrorRespone);
        } finally {
          this.spinner.hide('myspinner')
        }
      }
    })
  }
  playSound(soundLink: string) {
    let audio = new Audio(soundLink);
    audio.play();
  }

}
