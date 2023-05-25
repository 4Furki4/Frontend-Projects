import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WordResponse } from '../interfaces/word-response';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WordRequestService {

  constructor(private client: HttpClient) { }
  constructUrl(word: string) {
    return `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  }
  getWordMeaning(word: string) {
    let url = this.constructUrl(word);
    let observableOfGetRequest = this.client.get<Array<WordResponse>>(url)
    return firstValueFrom(observableOfGetRequest)
  }
}

