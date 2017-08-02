/**
 * Created by Joinsu on 2017-05-10.
 */
import {Component, OnInit}    from "@angular/core";
import {Router}               from "@angular/router";

import {AppConfig}            from "../app.config";
import {SignupService}        from "../_service/signup.service";

@Component({
  selector: 'coims-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent {

  constructor( private signupService: SignupService, private router: Router, private config:AppConfig){}
}
