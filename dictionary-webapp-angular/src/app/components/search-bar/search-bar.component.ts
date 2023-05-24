import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Word } from 'src/app/interfaces/word';
import { WordResponse } from 'src/app/interfaces/word-response';
import { WordRequestService } from 'src/app/services/word-request.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  constructor(private wordRequest: WordRequestService) {
    console.log("SearchBarComponent");
  }
  @ViewChild("searchForm") searchForm!: NgForm;
  wordInput: Word = new Word("")
  wordResponse !: Array<WordResponse>;
  async onSubmit() {
    const word = this.wordInput.word;
    this.wordResponse = await this.wordRequest.getWordMeaning(word)
    this.searchForm.reset()
  }
  public get isInputValid(): boolean {
    let wordFiltered = this.wordInput.word?.trim()
    return wordFiltered?.length > 0 ? true : false;
  }
}
