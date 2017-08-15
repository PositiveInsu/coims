/**
 * Created by Joinsu on 2017-05-12.
 */
import {Router}           from "@angular/router";
import {Location}         from "@angular/common";
import {Component}        from "@angular/core";

import {SignupService}    from "../_service/signup.service";
import {Consultant} from "../_model/consultant";
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";
import {SignupValidator} from "../_validator/signup.validator";

@Component({
  selector: 'coims-signup-verification',
  templateUrl: './signup-verification.component.html'
})
export class SignupVerificationComponent{
  private _consultantObj: Consultant;
  private _regiNoForm: FormGroup;
  private _iccrcNo: FormControl;
  // private _lawyerNo: FormControl;

  constructor( private signupService: SignupService,
               private fb:FormBuilder){
    this.initProgressBar();
    this.checkConsultantObj();
    this.initConsultantObj();
    this.initForm();
  }

  private initProgressBar() {
    this.signupService.progressBarObj.currentStep = 3;
  }

  private checkConsultantObj() {
  }

  private initConsultantObj() {
    this._consultantObj = this.signupService.consultantObj;
  }

  private initForm() {
    this._iccrcNo = new FormControl( '', Validators.compose([ Validators.required, Validators.pattern( SignupValidator.iccrcNoRegExp)]));
    // this._lawyerNo = new FormControl( '');

    this._regiNoForm = this.fb.group({
      iccrcNo : this._iccrcNo,
      // lawyerNo : this._lawyerNo
    });
  }

  private checkHasError( formControlObj:FormControl): boolean{
    return formControlObj.touched && !formControlObj.valid;
  }

  private checkEmptyValue( formControlObj:FormControl): boolean{
    return formControlObj.touched && formControlObj.getError('required');
  }

  private previousStep(){
    return '/signup/step' + (this.signupService.progressBarObj.currentStep - 1);
  }

  private nextStep(){
    return '/signup/step' + (this.signupService.progressBarObj.currentStep + 1);
  }
}
