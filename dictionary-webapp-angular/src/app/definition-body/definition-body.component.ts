import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WordRequestService } from '../services/word-request.service';
import { Meaning, WordResponse } from '../interfaces/word-response';
import { Word } from '../interfaces/word';

@Component({
  selector: 'app-definition-body',
  templateUrl: './definition-body.component.html',
  styleUrls: ['./definition-body.component.scss']
})
export class DefinitionBodyComponent {
  constructor(private wordRequest: WordRequestService) {

  }
  wordInput: Word = new Word("")
  @ViewChild("searchForm") searchForm!: NgForm;
  @ViewChild("definitions") definition!: ElementRef<HTMLDivElement>;
  @ViewChild("definitionHead") definitionHead!: ElementRef<HTMLDivElement>;
  @ViewChild("definitionBody") definitionBody!: ElementRef<HTMLDivElement>;

  wordResponse !: Array<WordResponse>;
  wordTitle !: string;
  async onSubmit() {
    const word = this.wordInput.word;
    this.wordResponse = await this.wordRequest.getWordMeaning(word)
    this.wordTitle = word;
    this.searchForm.reset()
  }

  public get isInputValid(): boolean {
    let wordFiltered = this.wordInput.word?.trim()
    return wordFiltered?.length > 0 ? true : false;
  }
  playSound(soundLink: string) {
    let audio = new Audio(soundLink);
    audio.play();
  }

}
