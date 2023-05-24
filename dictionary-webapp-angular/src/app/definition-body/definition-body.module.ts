import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefinitionBodyComponent } from './definition-body.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DefinitionBodyComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    DefinitionBodyComponent
  ]
})
export class DefinitionBodyModule { }
