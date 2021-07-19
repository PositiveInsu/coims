import { Component } from '@angular/core';
import './rxjs-operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private _title: string = 'COIMS';
  private _authenticated: boolean = false;

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get authenticated(): boolean {
    return this.authenticated;
  }

  set authenticated(value: boolean) {
    this.authenticated = value;
  }
}
