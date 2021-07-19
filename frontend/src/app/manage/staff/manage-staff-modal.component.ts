import {Component, OnInit, Output, EventEmitter} from "@angular/core";
import {CommonService} from "../../_service/common.service";
import {FormControl, Validators, FormGroup, FormBuilder, AbstractControl} from "@angular/forms";
import {SignupValidator} from "../../_validator/signup.validator";
import {checkPWEqualValidator} from "../../_validator/common.validator";
import {UserType} from "../../_model/user-type";
import {HttpClient} from "@angular/common/http";
import {RestfulUrlService} from "../../_service/restful-url.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ErrorService} from "../../_service/error.service";
import {User} from "../../_model/user";
import {ModalType} from "../../_model/modal-type";
declare var $ :any;

/**
 * Created by Joinsu on 2018-08-15.
 */
@Component({
  selector:'coims-manage-staff-modal',
  templateUrl: './manage-staff-modal.component.html',
  providers: []
})
export class ManageStaffModalComponent implements OnInit{

  @Output() parentRefresh = new EventEmitter();

  private _id: number;
  private _fName: AbstractControl;
  private _lName: AbstractControl;
  private _email: AbstractControl;
  private _phoneNo: AbstractControl;
  private _password: AbstractControl;
  private _rePassword: AbstractControl;
  private _position: AbstractControl;
  private _staffInfoForm: FormGroup;
  private _userType: UserType;
  private _modalType: ModalType;
  private _isEmailCheckError: boolean;
  private _userObj: User;
  private _isSubmit: boolean;
  private _title: string;
  private _mode: string;
  private _passwordPlaceHolder: string;
  private _positionList: Array<string>;

  constructor( private _commonService: CommonService,
               private _urlService: RestfulUrlService,
               private _errService: ErrorService,
               private _fb: FormBuilder,
               private _http: HttpClient,
  ){}

  ngOnInit(): void {
    this.initValiable();
    this.initForm();
  }

  private initValiable() {
    this.ressetUserObj();
    this._userType = new UserType();
    this._modalType = new ModalType();
    this._isSubmit = false;
  }

  private ressetUserObj() {
    this._userObj = new User();
  }

  private initForm() {

    this._fName = new FormControl( '', { updateOn:'blur', validators: Validators.compose([ Validators.required, Validators.pattern( SignupValidator.uppercaseNameRegExp)])});
    this._lName = new FormControl( '', { updateOn:'blur', validators: Validators.compose([ Validators.required, Validators.pattern( SignupValidator.uppercaseNameRegExp)])});
    this._email = new FormControl( '', { updateOn:'blur', validators: Validators.compose([ Validators.required, Validators.pattern( SignupValidator.emailRegExp)])});
    this._phoneNo = new FormControl( '', { updateOn: 'blur', validators: Validators.compose([ Validators.required, Validators.pattern( SignupValidator.phoneNoRegExp)])});
    this._password = new FormControl( '');
    this._rePassword = new FormControl( '');
    this._position = new FormControl( '', Validators.required);

    this._staffInfoForm = this._fb.group({
      fName: this._fName,
      lName: this._lName,
      email: this._email,
      phoneNo: this._phoneNo,
      password: this._password,
      rePassword: this._rePassword,
      position: this._position
    });
  }

  callAddStaffModal(){
    this.ressetUserObj();
    this.resetAddPasswordForm();
    this.resetForm();
    this.positionSetting();
    this._mode = this._modalType.ADD;
    this._title = "ADD STAFF";
    this._passwordPlaceHolder = "Password";
  }

  callModifyStaffModal( staff: any){
    this.ressetUserObj();
    this.resetModifyPasswordForm();
    this.resetForm();
    this.positionSetting( staff.type);
    this.setStaffInfo( staff);
    this.disableForm( staff.type);
    this._mode = this._modalType.MODIFY;
    this._title = "MODIFY STAFF";
    this._passwordPlaceHolder = "Change Password (Optional)";
  }

  private resetAddPasswordForm() {
    this._staffInfoForm.controls[ 'password'].clearValidators();
    this._staffInfoForm.controls[ 'password'].setValidators( Validators.compose([ Validators.required, SignupValidator.password]));
    this._password = this._staffInfoForm.controls[ 'password'];
    this._staffInfoForm.controls[ 'rePassword'].clearValidators();
    this._staffInfoForm.controls[ 'rePassword'].setValidators( Validators.compose([ Validators.required, checkPWEqualValidator( this._password)]));
    this._rePassword = this._staffInfoForm.controls[ 'rePassword'];
  }

  private resetModifyPasswordForm() {
    this._staffInfoForm.controls[ 'password'].clearValidators();
    this._staffInfoForm.controls[ 'password'].setValidators( SignupValidator.password);
    this._password = this._staffInfoForm.controls[ 'password'];
    this._staffInfoForm.controls[ 'rePassword'].clearValidators();
    this._staffInfoForm.controls[ 'rePassword'].setValidators( checkPWEqualValidator( this._password));
    this._rePassword = this._staffInfoForm.controls[ 'rePassword'];
  }

  private positionSetting( position?: string) {

    this._positionList = new Array<string>();

    if( position === this._userType.BOSS){
      this._positionList.push( this._userType.BOSS);
    }else{
      this._positionList.push( this._userType.MANAGER);
      this._positionList.push( this._userType.STAFF);
    }
    this._position.setValue( position ? position : "");
    this._userObj.setType( position ? position : "");
  }

  private resetForm() {
    this._fName.reset();
    this._lName.reset();
    this._email.reset();
    this._phoneNo.reset();
    this._position.setValue( "");
    this._password.reset();
    this._rePassword.reset();
    this._staffInfoForm.enable();
  }

  private setStaffInfo(staff: any) {
    this._id = staff.id;
    this._fName.setValue( staff.fname);
    this._lName.setValue( staff.lname);
    this._email.setValue( staff.email);
    this._userObj.setEmail( staff.email);
    this._phoneNo.setValue( staff.phoneNo);
  }

  private checkDuplicateEmail(){
    if( this.isModifyModal()){
      return;
    }
    if( this._email.valid){
      this._http.post( this._urlService.isDuplicateUser, this._email.value, { headers: this._urlService.headerTextPlain})
        .subscribe((data:boolean) => this.afterCheckDuplicate( data), (err :HttpErrorResponse)=> this._errService.reportError( err, this._email.value));
    }
  }

  private isModifyModal() {
    return this._mode === this._modalType.MODIFY && this._email.value === this._userObj.getEmail();
  }

  private checkAllConditionPassed(){
    return !this._staffInfoForm.valid || this._isSubmit;
  }

  private afterCheckDuplicate( data: boolean) {
    if( data){
      this._isEmailCheckError = true;
    }else{
      this._isEmailCheckError = false;
    }
  }

  private checkHasError( formControlObj:FormControl): boolean{
    return formControlObj.touched && !formControlObj.valid;
  }

  private submit(){
    if( !this._staffInfoForm.valid || this._isSubmit){

      return;
    }
    this.setFormValueToUserObj();
    this.submitUserObj();
  }

  private setFormValueToUserObj() {
    if( this._mode === this._modalType.MODIFY){
      this._userObj.setId( this._id);
    }
    this._userObj.setFName( this._fName.value);
    this._userObj.setLName( this._lName.value);
    this._userObj.setEmail( this._email.value);
    this._userObj.setPhoneNo( this._phoneNo.value);
    this._userObj.setType( this._position.value);
    this._userObj.setPassword( this._password.value);
    this._userObj.setCompany( this._commonService.user.getCompany());
  }

  private submitUserObj() {
    this.disableFormAndButton();
    this._http.put( this.getUrl(), JSON.stringify( this._userObj), {headers: this._urlService.headerJson})
      .subscribe( data => { this.afterSubmit( data)}, err => { this.afterError( err)});
  }

  private disableFormAndButton() {
    this._isSubmit = true;
    this._staffInfoForm.disable();
  }

  private getUrl(): string {
    let url: string;
    if( this._mode === this._modalType.MODIFY){
      url = this._urlService.modifyUser;
    }else{
      url = this._urlService.addStaff;
    }
    return url;
  }

  private afterSubmit( data: any) {
    this._isSubmit = false;
    this._staffInfoForm.enable();
    $('#modalAddstaff').modal('hide');
    this.parentRefresh.emit();
  }

  private afterError( err: any) {
    this._errService.reportError( err, this._userObj.getEmail());
    this._isSubmit = false;
    this._staffInfoForm.enable();
  }

  private disableForm( type: string) {
    if( type === this._userType.BOSS){
      this._position.disable();
      this._email.disable();
    }
  }
}
