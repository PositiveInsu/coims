import {Component, OnInit}                  from "@angular/core";
import {Router}                             from "@angular/router";
import {Location}                           from "@angular/common";
import {FormGroup, Validators, FormBuilder, FormControl, ValidatorFn, AbstractControl} from "@angular/forms";

import {SignupService}            from "../_service/signup.service";
import {SigninValidator}          from "../_validator/signin.validator";
import {Consultant}               from "../_model/consultant";



/**
 * Created by Joinsu on 2017-05-11.
 */
@Component({
  selector: 'coims-signup-personal-info',
  templateUrl: './signup-personal-info.component.html',
  styleUrls: ['./signup-personal-info.component.css']
})
export class SignupPersonalInfoComponent implements OnInit{
  private _consultantObj: Consultant;
  private _personalInfoForm: FormGroup;
  private _fName: FormControl;
  private _lName: FormControl;
  private _email: FormControl;
  private _password: FormControl;
  private _rePassword: FormControl;
  private _agreement: FormControl;

  constructor( private signupService: SignupService, private router: Router, private location: Location, private fb:FormBuilder){}

  ngOnInit(): void {
    this.initProgressBar();
    this.initSignupObj();
    this.initForm();
  }

  private initProgressBar() {
    this.signupService.progressBarObj.currentStep = 1;
  }

  private initSignupObj() {
    if( this.signupService.isNullConsultantObj()){
      this._consultantObj = this.signupService.newConsultantObj;
    }else{
      this._consultantObj = this.signupService.consultantObj;
    }
  }

  private initForm() {
    this._fName = new FormControl( '', Validators.compose([ Validators.required, Validators.pattern( SigninValidator.uppercaseNameRegExp)]));
    this._fName.valueChanges.subscribe( data => data ? this._consultantObj.fname = data.toUpperCase() : '' );

    this._lName = new FormControl( '', Validators.compose([ Validators.required, Validators.pattern( SigninValidator.uppercaseNameRegExp)]));
    this._lName.valueChanges.subscribe( data => data ? this._consultantObj.lname = data.toUpperCase() : '' );

    this._email = new FormControl( '', Validators.compose([ Validators.required, Validators.pattern( SigninValidator.emailRegExp)]));

    this._password = new FormControl( '', Validators.compose([ Validators.required, SigninValidator.password]));
    this._rePassword = new FormControl( '', Validators.compose([ Validators.required, this.equalPassword()]));
    this._agreement = new FormControl( '', Validators.required);

    this._personalInfoForm = this.fb.group({
      fName: this._fName,
      lName: this._lName,
      email: this._email,
      password: this._password,
      rePassword: this._rePassword,
      agreement: this._agreement
    });
  }

  private equalPassword(): ValidatorFn{
    return (control: AbstractControl): {[key: string]: any} => {
      let value: string = control.value;
      let result: boolean = false;
      let resultObj = { equalPassword: {
        valid: false,
        message: ''
      }};

      if(!value){ return null;}

      if( value !== this._password.value){
        result = true;
        resultObj.equalPassword.message = 'The password do not match. Please try again.';
      };

      return result ? resultObj : null;
    };
  }
}
