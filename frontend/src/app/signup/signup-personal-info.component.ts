import {Component, OnInit, AfterViewInit}                  from "@angular/core";
import {FormGroup, Validators, FormBuilder, FormControl, ValidatorFn, AbstractControl} from "@angular/forms";

import {SignupService}            from "../_service/signup.service";
import {SignupValidator}          from "../_validator/signup.validator";
import {checkPWEqualValidator}    from "../_validator/common.validator";
import {User}               from "../_model/user";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {SignupComponent} from "./signup.component";
import {ErrorService} from "../_service/error.service";
import {HttpErrorResponse} from "@angular/common/http";
import {RestfulUrlService} from "../_service/restful-url.service";
import {CommonService} from "../_service/common.service";

/**
 * Created by Joinsu on 2017-05-11.
 */
@Component({
  selector: 'coims-signup-personal-info',
  templateUrl: './signup-personal-info.component.html',
  styleUrls: ['./signup-personal-info.component.css']
})
export class SignupPersonalInfoComponent implements OnInit, AfterViewInit{
  private _consultantObj: User;
  private _personalInfoForm: FormGroup;
  private _fName: FormControl;
  private _lName: FormControl;
  private _email: FormControl;
  private _phoneNo: FormControl;
  private _password: FormControl;
  private _rePassword: FormControl;
  private _agreement: FormControl;
  private _isOpenEmailTooltip: boolean;
  private _checkEmailResultMessage: String;
  private _checkEmailMessage;
  private _isEmailCheckError: boolean;

  constructor( private _signupService: SignupService,
               private _errorService: ErrorService,
               private _fb:FormBuilder,
               private _router: Router,
               private _http: HttpClient,
               private _urlService: RestfulUrlService,
               private _parent: SignupComponent
  ){}

  ngOnInit(): void {
    this.initProgressBar();
    this.initSignupObj();
    this.initForm();
    this.initData();
  }

  ngAfterViewInit(): void {
    this._parent.cdref.detectChanges();
  }

  private initProgressBar() {
    this._signupService.progressBarObj.currentStep = 1;
  }

  private initSignupObj() {
    if( this._signupService.isNullConsultantObj()){
      this._consultantObj = this._signupService.newConsultantObj;
    }else{
      this._consultantObj = this._signupService.consultantObj;
    }
  }

  private initForm() {
    this._fName = new FormControl( this._consultantObj.getFName(), { updateOn:'blur', validators: Validators.compose([ Validators.required, Validators.pattern( SignupValidator.uppercaseNameRegExp)])});
    this._lName = new FormControl( this._consultantObj.getLName(), { updateOn:'blur', validators: Validators.compose([ Validators.required, Validators.pattern( SignupValidator.uppercaseNameRegExp)])});

    this._email = new FormControl( this._consultantObj.getEmail(), { updateOn:'blur', validators: Validators.compose([ Validators.required, Validators.pattern( SignupValidator.emailRegExp)])});
    this._phoneNo = new FormControl( this._consultantObj.getPhoneNo());

    this._password = new FormControl( '', Validators.compose([ Validators.required, SignupValidator.password]));
    this._rePassword = new FormControl( '', Validators.compose([ Validators.required, checkPWEqualValidator( this._password)]));
    this._agreement = new FormControl( '', Validators.required);

    this._personalInfoForm = this._fb.group({
      fName: this._fName,
      lName: this._lName,
      email: this._email,
      phoneNo: this._phoneNo,
      password: this._password,
      rePassword: this._rePassword,
      agreement: this._agreement
    });
  }

  private initData() {
    this._isOpenEmailTooltip = false;
    this._checkEmailMessage = {
      checking: 'Checking Email...',
      exist: 'Email already exist, please change the email'
    };
    this._checkEmailResultMessage = this._checkEmailMessage.checking;
    this._isEmailCheckError = false;
  }

  private checkHasError( formControlObj:FormControl): boolean{
    return formControlObj.touched && !formControlObj.valid;
  }

  private checkEmptyValue( formControlObj:FormControl): boolean{
    return formControlObj.touched && formControlObj.getError('required');
  }

  private checkDuplicateEmail(){
    if( this._email.valid){
      this._isOpenEmailTooltip = true;
      this._checkEmailResultMessage = this._checkEmailMessage.checking;

      this._http.post( this._urlService.isDuplicateUser, this._email.value, { headers: this._urlService.headerTextPlain})
        .subscribe( data => this.afterCheck( data), (err :HttpErrorResponse)=> this._errorService.reportError( err, this._email.value));
    }
  }

  private isAllConditionPassed(){
    let formCondition :boolean = !this._personalInfoForm.valid;
    let agreementChecked :boolean = this._agreement.value? false: true;
    let emailError :boolean = this._isEmailCheckError;

    return !(formCondition || agreementChecked || emailError);
  }

  private afterCheck( data: any) {
    if( data){
      this._checkEmailResultMessage = this._checkEmailMessage.exist;
      this._isEmailCheckError = true;
    } else{
      this._isOpenEmailTooltip = false;
      this._isEmailCheckError = false;
    }
  }

  private next(){
    if( !this.isAllConditionPassed()){
      return;
    }
    this.setFormValueToConsultantObj();
    this.nextStep();
  }

  private nextStep(){
    this._signupService.nextStep( this._router);
  }

  private setFormValueToConsultantObj() {
    this._consultantObj.setFName( this._fName.value);
    this._consultantObj.setLName( this._lName.value);
    this._consultantObj.setEmail( this._email.value);
    this._consultantObj.setPhoneNo( this._phoneNo.value)
    this._consultantObj.setPassword( this._password.value);
  }

  private changeValueToUpperCase( formControlObj: FormControl){
    if( formControlObj.value){
      formControlObj.setValue( formControlObj.value.toUpperCase());
    }
  }
}
