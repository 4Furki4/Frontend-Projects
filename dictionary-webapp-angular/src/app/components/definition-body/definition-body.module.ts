import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefinitionBodyComponent } from './definition-body.component';
import { RouterModule } from '@angular/router';
import { FilterPhoneticsPipe } from 'src/app/pipes/filter-phonetics.pipe';



@NgModule({
  declarations: [
    DefinitionBodyComponent,
    FilterPhoneticsPipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: DefinitionBodyComponent, title: 'definitions word' }
    ])
  ]
})
export class DefinitionBodyModule { }
