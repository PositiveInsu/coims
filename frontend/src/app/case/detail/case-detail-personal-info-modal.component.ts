import {Component, OnInit, Input} from "@angular/core";
import {User} from "../../_model/user";
import {CommonService} from "../../_service/common.service";
import {FormGroup, AbstractControl, FormControl, FormBuilder, Validators} from "@angular/forms";
import {SignupValidator} from "../../_validator/signup.validator";
import {MonthName, CommonDataService, Country, Province} from "../../_service/common-data.service";
import {HttpClient} from "@angular/common/http";
import {RestfulUrlService} from "../../_service/restful-url.service";
import {ErrorService} from "../../_service/error.service";
import {HttpErrorResponse} from "@angular/common/http";
/**
 * Created by Joinsu on 2019-05-16.
 */
@Component({
  selector:'coims-case-detail-personal-info-modal',
  templateUrl: 'case-detail-personal-info-modal.component.html',
  providers: []
})
export class CaseDetailPersonalInfoModalComponent implements OnInit {

  @Input() index: number;
  @Input() client: User;

  private _isModifyMode: boolean;
  private _isSubmit: boolean;
  private _isNameExist: boolean;
  private _countryList: Country[];
  private _provinceList: Province[];
  private _monthList: MonthName[];
  private _thisYear: number;

  private _personalInfoForm: FormGroup;
  private _fName: AbstractControl;
  private _lName: AbstractControl;
  private _bMonth: AbstractControl;
  private _bDate: AbstractControl;
  private _bYear: AbstractControl;
  private _email: AbstractControl;
  private _phoneNo: AbstractControl;
  private _country: AbstractControl;
  private _street: AbstractControl;
  private _city: AbstractControl;
  private _province: AbstractControl;
  private _postal: AbstractControl;

  constructor( private _commonService: CommonService,
               private _commonDataService: CommonDataService,
               private _fb: FormBuilder,
               private _http: HttpClient,
               private _urlService: RestfulUrlService,
               private _errService: ErrorService
  ) {}

  ngOnInit(): void {
    this.initValuables();
    this.initForm();
  }

  private initValuables() {
    this._isModifyMode = false;
    this._isSubmit = false;
    this._isNameExist = false;
    this._countryList = this._commonDataService.countries;
    this._provinceList = this._commonDataService.provinces;
    this._monthList = this._commonDataService.months;
    this._thisYear = new Date().getFullYear();
  }

  private initForm() {
    this._fName = new FormControl( this.client.getFName(), { updateOn:'blur', validators: Validators.compose([ Validators.required, Validators.pattern( SignupValidator.uppercaseNameRegExp)])});
    this._lName = new FormControl( this.client.getLName(), { updateOn:'blur', validators: Validators.compose([ Validators.required, Validators.pattern( SignupValidator.uppercaseNameRegExp)])});
    this._bYear = new FormControl( this.getBYearValue());
    this._bMonth = new FormControl( this.getBMonthValue());
    this._bDate = new FormControl( this.getBDateValue());
    this._email = new FormControl( this.client.getEmail(), { updateOn:'blur', validators: Validators.compose([ Validators.required, Validators.pattern( SignupValidator.emailRegExp)])});
    this._phoneNo = new FormControl( this.client.getPhoneNo(), { updateOn: 'blur', validators: Validators.compose([Validators.required, Validators.pattern(SignupValidator.phoneNoRegExp)])});
    this._country = new FormControl( this.client.getCountry() ? this.client.getCountry() : "");
    this._province = new FormControl( this.client.getProvince() ? this.client.getProvince() : "");
    this._street = new FormControl( this.client.getStreet());
    this._city = new FormControl( this.client.getCity());
    this._postal = new FormControl( this.client.getPostal());

    this._personalInfoForm = this._fb.group({
      fName: this._fName,
      lName: this._lName,
      bYear: this._bYear,
      bMonth: this._bMonth,
      bDate: this._bDate,
      email: this._email,
      phoneNo: this._phoneNo,
      country: this._country,
      province: this._province,
      street: this._street,
      city: this._city,
      postal: this._postal
    });
  }

  private getModalId(): string{
    return "personal_modal_" + this.index;
  }

  private getClientName(): string{
    return this.client.getFName() + " " + this.client.getLName();
  }

  private getDateString(): string{
    if( this.client.getBirthDate()){
      return this._commonService.getStringDateFromDate( this.client.getBirthDate());
    }
    return "-";
  }

  private getStringValue( data: any): string{
    if( data){
      return data;
    }
    return "-";
  }

  private getRange( min:number, max:number): Array<number>{
    return this._commonService.getCreatedRange( min, max);
  }

  private checkHasError(formControlObj: FormControl): boolean {
    return formControlObj.touched && !formControlObj.valid;
  }

  private checkEmptyValue(formControlObj: FormControl): boolean {
    return formControlObj.touched && formControlObj.getError('required');
  }

  private changeValueToUpperCase( formControlObj: FormControl){
    if( formControlObj.value){
      formControlObj.setValue( formControlObj.value.toUpperCase());
    }
  }

  private isAllConditionPassed(): boolean{
    return this._personalInfoForm.valid;
  }

  private toggleModifyMode( flag: boolean): void{
    this._isModifyMode = flag;
  }

  private modifyPersonalDate(): void{
    let user: User = this.setDataToUserObj();
    this.disableFormAndButton();
    this._http.post( this._urlService.isExistClientName, JSON.stringify( user), {headers: this._urlService.headerJson})
      .subscribe( data => { this.afterCheckUserName( data, user)}, err => { this.afterError( err)});
  }

  private afterCheckUserName(data: any, user: User) {
    if( data){
      this._isSubmit = false;
      this._personalInfoForm.enable();
      this._fName.setErrors( null);
      this._lName.setErrors( null);
      this._isNameExist = true;
    }else{
      this._http.put( this._urlService.modifyClient, JSON.stringify( user), {headers: this._urlService.headerJson})
        .subscribe( data => { this.afterSubmit( data)}, err => { this.afterError( err)});
    }
  }

  private disableFormAndButton() {
    this._isSubmit = true;
    this._personalInfoForm.disable();
  }

  private setDataToUserObj(): User{
    let user: User = new User();

    user.setId( this.client.getId());
    user.setEmail( this.getChangedValue( this.client.getEmail(), this._email.value));
    user.setFName( this.getChangedValue( this.client.getFName(), this._fName.value));
    user.setLName( this.getChangedValue( this.client.getLName(), this._lName.value));
    user.setBirthDate( this.getChangedBirthDate());
    user.setPhoneNo( this.getChangedValue( this.client.getPhoneNo(), this._phoneNo.value));
    user.setCountry( this.getChangedValue( this.client.getCountry(), this._country.value));
    user.setProvince( this.getChangedValue( this.client.getProvince(), this._province.value));
    user.setStreet( this.getChangedValue( this.client.getStreet(), this._street.value));
    user.setCity( this.getChangedValue( this.client.getCity(), this._city.value));
    user.setPostal( this.getChangedValue( this.client.getPostal(), this._postal.value));

    return user;
  }

  private getChangedValue( originValue: any, changedValue: any): any{
    if( !originValue){
      originValue = null;
    }
    if( !changedValue){
      changedValue = null;
    }
    if( originValue != changedValue){
      return changedValue;
    }
    return originValue;
  }

  private getBYearValue(): any{
    return this.client.getBirthDate() ? this.client.getBirthDate().getFullYear() : "";
  }

  private getBMonthValue(): any{
    return this.client.getBirthDate() ? this.client.getBirthDate().getMonth() + 1  : "";
  }

  private getBDateValue(): any {
    return this.client.getBirthDate() ? this.client.getBirthDate().getDate() : "";
  }

  private afterError( err: any) {
    this._errService.reportError( err, "Client Information Change Fail. " + this.client.getEmail());
    this._isSubmit = false;
    this._personalInfoForm.enable();
  }

  private getChangedBirthDate(): Date{
    let birthDate: Date = null;
    if( this._bDate.value > 0 && this._bMonth.value > 0 && this._bYear.value > 0){
      birthDate = new Date( this._bYear.value + "-" + this._bMonth.value + "-" + this._bDate.value);
    }
    if( this.getDateString() != this._commonService.getStringDateFromDate( birthDate)){
      return birthDate;
    }else{
      return this.client.getBirthDate();
    }
  }

  private afterSubmit( data: Object) {
    console.log( data);
  }


}








