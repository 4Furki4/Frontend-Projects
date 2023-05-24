import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarModule } from './navbar/navbar.module';
import { DefinitionBodyModule } from './definition-body/definition-body.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavbarModule,
    DefinitionBodyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
