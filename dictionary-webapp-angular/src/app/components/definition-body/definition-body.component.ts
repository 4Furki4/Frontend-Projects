import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WordRequestService } from '../../services/word-request.service';
import { WordResponse } from '../../interfaces/word-response';
import { Word } from '../../interfaces/word';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-definition-body',
  templateUrl: './definition-body.component.html',
  styleUrls: ['./definition-body.component.scss']
})
export class DefinitionBodyComponent implements OnInit {
  constructor(private wordRequest: WordRequestService, private activatedRoute: ActivatedRoute) {
    console.log("DefinitionBodyComponent");
  }
  wordFromParam !: string;
  async ngOnInit(): Promise<void> {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.wordFromParam = param.get("word") ?? ""
    })
    if (this.wordFromParam.length > 0) {
      this.wordResponse = await this.wordRequest.getWordMeaning(this.wordFromParam)
    }
  }
  wordInput: Word = new Word("")
  @ViewChild("searchForm") searchForm!: NgForm;
  @ViewChild("definitions") definition!: ElementRef<HTMLDivElement>;
  @ViewChild("definitionHead") definitionHead!: ElementRef<HTMLDivElement>;
  @ViewChild("definitionBody") definitionBody!: ElementRef<HTMLDivElement>;

  wordResponse !: Array<WordResponse>;
  wordTitle !: string;


  public get isInputValid(): boolean {
    let wordFiltered = this.wordInput.word?.trim()
    return wordFiltered?.length > 0 ? true : false;
  }
  playSound(soundLink: string) {
    let audio = new Audio(soundLink);
    audio.play();
  }

}
