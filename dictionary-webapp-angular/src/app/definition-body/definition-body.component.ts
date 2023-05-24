import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Word } from '../word';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-definition-body',
  templateUrl: './definition-body.component.html',
  styleUrls: ['./definition-body.component.scss']
})
export class DefinitionBodyComponent implements AfterViewInit {
  constructor() {

  }
  word: Word = new Word("")
  @ViewChild("searchForm") searchForm!: NgForm;
  @ViewChild("definitions") definition!: ElementRef;
  @ViewChild("definitionHead") definitionHead!: ElementRef;
  @ViewChild("definitionBody") definitionBody!: ElementRef;
  ngAfterViewInit(): void {
    // console.log(this.definitionBody.nativeElement);
  }
  onSubmit() {
    console.log(this.word.word);
    this.searchForm.reset()
  }

  public get isInputValid(): boolean {
    let wordFiltered = this.word.word?.trim()
    return wordFiltered?.length > 0 ? true : false;
  }

}
