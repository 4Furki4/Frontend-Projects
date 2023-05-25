import { Component, HostListener, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Word } from 'src/app/interfaces/word';
import { WordResponse } from 'src/app/interfaces/word-response';
import { WordRequestService } from 'src/app/services/word-request.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  constructor(private wordRequest: WordRequestService, private route: Router) { }
  @ViewChild("searchForm") searchForm!: NgForm;
  wordInput: Word = new Word("")
  wordResponse !: Array<WordResponse>;
  async onSubmit() {
    const word = this.wordInput.word;
    this.route.navigate([`${word}`])
  }
  @HostListener('window:keydown.enter', ['$event'])
  onEnter(event: KeyboardEvent) {
    if (event.target instanceof HTMLInputElement) {
      // when word searched by pressing enter on input element, submit the form and change the focus so that input validation error doesn't appear when not focused
      this.onSubmit()
      event.target.blur()
      this.searchForm.reset()
    }
  }
  public get isInputValid(): boolean {
    let wordFiltered = this.wordInput.word?.trim()
    return wordFiltered?.length > 0 ? true : false;
  }
}
