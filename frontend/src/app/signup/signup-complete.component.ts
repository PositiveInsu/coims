/**
 * Created by Joinsu on 2017-05-12.
 */
import {Component}        from "@angular/core";
import {SignupService}    from "../_service/signup.service";
@Component({
  selector: 'coims-signup-complete',
  templateUrl: './signup-complete.component.html'
})
export class SignupCompleteComponent{
  constructor(private signupService: SignupService){
    this.signupService.progressBarObj.currentStep = 4;
  }
}
