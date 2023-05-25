import { Pipe, PipeTransform } from '@angular/core';
import { phonetic } from '../interfaces/word-response';

@Pipe({
  name: 'filterPhonetics'
})
export class FilterPhoneticsPipe implements PipeTransform {

  transform(phonetics: Array<phonetic>, ...args: unknown[]): Array<phonetic> {
    return phonetics.filter((phonetic) => (phonetic.text?.length > 0 && phonetic.audio?.length > 0))
  }

}
