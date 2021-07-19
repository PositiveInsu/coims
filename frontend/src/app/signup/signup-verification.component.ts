/**
 * Created by Joinsu on 2017-05-12.
 */
import {Router}           from "@angular/router";
import {Component, OnInit, AfterViewInit}        from "@angular/core";

import {SignupService}    from "../_service/signup.service";
import {User} from "../_model/user";
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";
import {SignupValidator} from "../_validator/signup.validator";
import {HttpClient} from "@angular/common/http";
import {HttpHeaders} from "@angular/common/http";
import {SignupComponent} from "./signup.component";
import {ErrorService} from "../_service/error.service";
import {HttpErrorResponse} from "@angular/common/http";
import {RestfulUrlService} from "../_service/restful-url.service";

@Component({
  selector: 'coims-signup-verification',
  templateUrl: './signup-verification.component.html'
})
export class SignupVerificationComponent implements OnInit, AfterViewInit {
  private _consultantObj: User;
  private _regiNoForm: FormGroup;
  private _iccrcNo: FormControl;
  private _isOpenMemberIDTooltip: boolean;
  private _isSubmit: boolean;
  private _isMemberIDHasError: boolean;
  private _checkMemberIDResultMessage: string;
  private _checkMemberIDMessage;


  constructor(private _signupService: SignupService,
              private _errorService: ErrorService,
              private _fb: FormBuilder,
              private _router: Router,
              private _http: HttpClient,
              private _urlService: RestfulUrlService,
              private _parent: SignupComponent) {
  }

  ngOnInit(): void {
    this.checkConsultantObj();
    this.initProgressBar();
    this.initConsultantObj();
    this.initForm();
    this.initData();
  }

  ngAfterViewInit(): void {
    this._parent.cdref.detectChanges();
  }

  private checkConsultantObj() {
    if ( this._signupService.isNullConsultantObj()) {
      this._signupService.moveToStep(this._router, 1);
    }
  }

  private initProgressBar() {
    this._signupService.progressBarObj.currentStep = 3;
  }

  private initConsultantObj() {
    if ( this._signupService.isNullConsultantObj()) {
      this._consultantObj = this._signupService.newConsultantObj;
    } else {
      this._consultantObj = this._signupService.consultantObj;
    }
  }

  private initForm() {
    this._iccrcNo = new FormControl(this._consultantObj.getMemberId(), Validators.compose([Validators.required, Validators.pattern(SignupValidator.iccrcNoRegExp)]));
    this._regiNoForm = this._fb.group({
      iccrcNo: this._iccrcNo,
    });
  }

  private initData() {
    this._isSubmit = false;
    this._isOpenMemberIDTooltip = false;
    this._checkMemberIDMessage = {
      checking: 'Checking MemberID...',
      exist: 'MemberID already exist, please check your MemberID'
    };
    this._checkMemberIDResultMessage = this._checkMemberIDMessage.checking;
    this._isMemberIDHasError = true;
  }

  private checkHasError(formControlObj: FormControl): boolean {
    return formControlObj.touched && !formControlObj.valid;
  }

  private checkEmptyValue(formControlObj: FormControl): boolean {
    return formControlObj.touched && formControlObj.getError('required');
  }

  private checkDuplicateMemberID() {
    if ( this._iccrcNo.valid) {
      this._isOpenMemberIDTooltip = true;
      this._checkMemberIDResultMessage = this._checkMemberIDMessage.checking;

      const headerInfo: HttpHeaders = new HttpHeaders({"Content-Type": "text/plain"});

      this._http.post( this._urlService.isDuplicateMemberID, this._iccrcNo.value, { headers: headerInfo})
        .subscribe( data => this.afterCheckDuplicateMemberID( data), ( err :HttpErrorResponse)=> this._errorService.reportError( err, this._iccrcNo.value));
    }
  }

  private setValueAndSubmit() {
    this.setFormValueToConsultantObj();
    this.submitConsultantObj();
  }

  private setFormValueToConsultantObj() {
    this._consultantObj.setMemberId( this._iccrcNo.value);
  }

  private submitConsultantObj() {
    this._isSubmit = true;
    this._regiNoForm.disable();
    const headerInfo: HttpHeaders = new HttpHeaders({ "Content-Type": "application/json"});
    this._http.put( this._urlService.consultantSubmit, JSON.stringify( this._consultantObj), {headers: headerInfo})
      .subscribe( data => this.afterSubmit( data, this._router),  ( err :HttpErrorResponse)=> this._errorService.reportError( err, this._iccrcNo.value));
  }

  private afterSubmit( data, router: Router) {
    this._regiNoForm.enable();
    if ( data.email === this._consultantObj.getEmail()) {
      this._signupService.nextStep(router);
    }
  }

  private afterCheckDuplicateMemberID(data: any) {
    if ( data) {
      this._checkMemberIDResultMessage = this._checkMemberIDMessage.exist;
      this._isMemberIDHasError = true;
    } else {
      this._isOpenMemberIDTooltip = false;
      this._isMemberIDHasError = false;
    }
  }

  private checkAllConditionPassed() {
    return !this._regiNoForm.valid || this._isSubmit || this._isMemberIDHasError;
  }

  private initFocusCondition(){
    this._iccrcNo.markAsUntouched();
    this._isMemberIDHasError = true;
    this._isOpenMemberIDTooltip = false;
  }

}
