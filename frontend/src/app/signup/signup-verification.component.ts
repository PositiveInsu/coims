/**
 * Created by Joinsu on 2017-05-12.
 */
import {Router}           from "@angular/router";
import {Location}         from "@angular/common";
import {Component}        from "@angular/core";

import {SignupService}    from "../_service/signup.service";

@Component({
  selector: 'coims-signup-verification',
  templateUrl: './signup-verification.component.html'
})
export class SignupVerificationComponent{
  constructor( private signupService: SignupService, private router: Router, private location: Location){
    this.signupService.progressBarObj.currentStep = 3;
  }

  goPreviousPage(){
    this.location.back();
  }

  goNextPage(){
    this.router.navigate( ['/signup/step4']);
  }
}
