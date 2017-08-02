import { BrowserModule }                      from '@angular/platform-browser';
import { NgModule }                           from '@angular/core';
import {FormsModule, ReactiveFormsModule}     from '@angular/forms';
import { HttpModule }                         from '@angular/http';

import { AppRoutingModule } from "./app.routing.module";

import { AuthGuard }             from "./_guard/auth.guard";
import { AppConfig }             from "./app.config";

import { AppComponent }             from './app.component';
import { PageNotFoundComponent }    from "./common/page-not-found.component";
import { MainComponent }            from "./main/main.component";
import { BrowserAnimationsModule }  from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    AuthGuard,
    AppConfig
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
