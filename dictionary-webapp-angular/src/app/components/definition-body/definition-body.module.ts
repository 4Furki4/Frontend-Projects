import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefinitionBodyComponent } from './definition-body.component';
import { RouterModule } from '@angular/router';
import { FilterPhoneticsPipe } from 'src/app/pipes/filter-phonetics.pipe';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [
    DefinitionBodyComponent,
    FilterPhoneticsPipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: DefinitionBodyComponent, title: 'definitions word' }
    ]),
    NgxSpinnerModule.forRoot({
      type: 'ball-8-bits'
    })
  ]
})
export class DefinitionBodyModule { }
