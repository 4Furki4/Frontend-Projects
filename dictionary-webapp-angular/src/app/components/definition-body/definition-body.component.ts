import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { WordRequestService } from '../../services/word-request.service';
import { WordResponse } from '../../interfaces/word-response';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-definition-body',
  templateUrl: './definition-body.component.html',
  styleUrls: ['./definition-body.component.scss']
})
export class DefinitionBodyComponent implements OnInit {
  constructor(private wordRequest: WordRequestService, private activatedRoute: ActivatedRoute) { }
  wordResponse !: Array<WordResponse>;
  wordTitle !: string;
  wordFromParam !: string;
  async ngOnInit(): Promise<void> {
    this.activatedRoute.paramMap.subscribe(async (param) => {
      this.wordFromParam = param.get("word") ?? ""
      if (this.wordFromParam.length > 0) {
        this.wordResponse = await this.wordRequest.getWordMeaning(this.wordFromParam)
        this.wordTitle = this.wordResponse[0].word
      }
    })
  }
  playSound(soundLink: string) {
    let audio = new Audio(soundLink);
    audio.play();
  }

}
