/**
 * Created by Joinsu on 2017-04-30.
 */
import {Component}      from "@angular/core";
import {Router}         from "@angular/router";
import {LoginService}   from "./login.service";
import {AppConfig}      from "../app.config";

@Component({
  selector:'coims-login',
  templateUrl: './login.component.html',
  providers: []
})
export class LoginComponent{

  constructor(private loginService: LoginService, private router: Router, private config:AppConfig) {
  }
}
