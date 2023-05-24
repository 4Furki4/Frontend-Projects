import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefinitionBodyComponent } from './definition-body.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FilterPhoneticsPipe } from '../pipes/filter-phonetics.pipe';



@NgModule({
  declarations: [
    DefinitionBodyComponent,
    FilterPhoneticsPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
  ],
  exports: [
    DefinitionBodyComponent
  ]
})
export class DefinitionBodyModule { }
