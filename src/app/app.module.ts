import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AceEditorModule } from 'ng2-ace-editor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorComponent } from './error/error.component';
import { AceComponent } from './ace/ace.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    AceComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AceEditorModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
