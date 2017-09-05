/**
 * Created by Joinsu on 2017-05-12.
 */
import {Router}           from "@angular/router";
import {Component, OnInit}        from "@angular/core";

import {SignupService}    from "../_service/signup.service";
import {Consultant} from "../_model/consultant";
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";
import {SignupValidator} from "../_validator/signup.validator";
import {Http} from "@angular/http";

@Component({
  selector: 'coims-signup-verification',
  templateUrl: './signup-verification.component.html'
})
export class SignupVerificationComponent implements OnInit{
  private _consultantObj: Consultant;
  private _regiNoForm: FormGroup;
  private _iccrcNo: FormControl;

  constructor( private _signupService: SignupService,
               private _fb: FormBuilder,
               private _router: Router){}

  ngOnInit(): void {
    this.checkConsultantObj();
    this.initProgressBar();
    this.initConsultantObj();
    this.initForm();
  }

  private checkConsultantObj(){
    if( this._signupService.isNullConsultantObj()){
      this._signupService.moveToStep( this._router, 1);
    }
  }

  private initProgressBar() {
    this._signupService.progressBarObj.currentStep = 3;
  }

  private initConsultantObj() {
    if( this._signupService.isNullConsultantObj()){
      this._consultantObj = this._signupService.newConsultantObj;
    }else{
      this._consultantObj = this._signupService.consultantObj;
    }
  }

  private initForm() {
    this._iccrcNo = new FormControl( '', Validators.compose([ Validators.required, Validators.pattern( SignupValidator.iccrcNoRegExp)]));

    this._regiNoForm = this._fb.group({
      iccrcNo : this._iccrcNo,
    });
  }

  private checkHasError( formControlObj:FormControl): boolean{
    return formControlObj.touched && !formControlObj.valid;
  }

  private checkEmptyValue( formControlObj:FormControl): boolean{
    return formControlObj.touched && formControlObj.getError('required');
  }

  private submitConsultantObj(){
    this._signupService.submitConsultantObj();
  }
}
