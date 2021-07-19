import {Component, OnInit} from "@angular/core";
import {CommonService} from "../../_service/common.service";
import {Company} from "../../_model/company";
import {User} from "../../_model/user";
import {MainService} from "../../_service/main.service";
import {MainComponent} from "../../main/main.component";
import {AbstractControl, FormControl, Validators, FormGroup, FormBuilder} from "@angular/forms";
import {SignupValidator} from "../../_validator/signup.validator";
import {CommonDataService, Country, Province} from "../../_service/common-data.service";
import {RestfulUrlService} from "../../_service/restful-url.service";
import {HttpClient} from "@angular/common/http";
import {HttpErrorResponse} from "@angular/common/http";
import {ErrorService} from "../../_service/error.service";
/**
 * Created by Joinsu on 2018-08-30.
 */
@Component({
  selector:'coims-manage-company',
  templateUrl: './manage-company.component.html',
  providers: []
})
export class ManageCompanyComponent implements OnInit{
  private _mode: boolean;
  private _user: User;
  private _companyObj: Company;
  private _countries: Country[];
  private _provinces: Province[];
  private _isSubmitting: boolean;

  private _companyInfoForm: FormGroup;
  private _cName: AbstractControl;
  private _country: AbstractControl;
  private _province: AbstractControl;
  private _street: AbstractControl;
  private _city: AbstractControl;
  private _postal: AbstractControl;
  private _cPhone: AbstractControl;
  private _cEmail: AbstractControl;
  private _website: AbstractControl;
  private _fax: AbstractControl;
  private _gstNo: AbstractControl;

  constructor( private _commonService: CommonService,
               private _mainService: MainService,
               private _commonDataService: CommonDataService,
               private _urlService: RestfulUrlService,
               private _errService: ErrorService,
               private _parent: MainComponent,
               private _fb: FormBuilder,
               private _http: HttpClient
  ){}

  ngOnInit(): void {
    this._mainService.changeMenu( this._mainService.leftMenuFactory.COMPINFO);
    this.initValuable();
    this.initForm();
    this._parent.detectChanges();
  }

  private initValuable() {
    this._mode = true;
    this._isSubmitting = false;
    this._user = this._commonService.user;
    this._companyObj = this._commonService.user.getCompany();
    this._countries = this._commonDataService.countries;
    this._provinces = this._commonDataService.provinces;
  }

  private initForm() {
    this._cName = new FormControl( this._companyObj.getName(), {updateOn: 'blur', validators: Validators.required});
    this._street = new FormControl( this._companyObj.getStreet(), {updateOn: 'blur', validators: Validators.required});
    this._city = new FormControl( this._companyObj.getCity(), {updateOn: 'blur', validators: Validators.required});
    this._postal = new FormControl( this._companyObj.getPostal(), {updateOn: 'blur', validators: Validators.required});
    this._cPhone = new FormControl( this._companyObj.getPhone(), {
      updateOn: 'blur',
      validators: Validators.compose([Validators.required, Validators.pattern( SignupValidator.phoneNoRegExp)])
    });
    this._cEmail = new FormControl( this._companyObj.getEmail(), {
      updateOn: 'blur',
      validators: Validators.compose([Validators.required, Validators.pattern( SignupValidator.emailRegExp)])
    });
    this._country = new FormControl( this._companyObj.getCountry());
    this._province = new FormControl( this._companyObj.getProvince());
    this._website = new FormControl( this._companyObj.getWebsite());
    this._fax = new FormControl( this._companyObj.getFax());
    this._gstNo = new FormControl( this._companyObj.getGstNo(), {updateOn: 'blur', validators: Validators.pattern( SignupValidator.gstNoExp)});

    this._companyInfoForm = this._fb.group({
      cName: this._cName,
      street: this._street,
      city: this._city,
      postal: this._postal,
      cPhone: this._cPhone,
      cEmail: this._cEmail,
      country: this._country,
      province: this._province,
      website: this._website,
      fax: this._fax,
      gstNo: this._gstNo
    });
  }

  private saveCompanyInfo(){
    if( this._isSubmitting){
      return;
    }
    this.submitCompanyObj( this.setFormValueToCompanyObj());
  }

  private setFormValueToCompanyObj(): Company {
    let modifyCompanyInfo: Company = new Company();
    modifyCompanyInfo.setId( this._companyObj.getId());
    modifyCompanyInfo.setName( this._cName.value);
    modifyCompanyInfo.setCountry( this._country.value);
    modifyCompanyInfo.setProvince( this._province.value)
    modifyCompanyInfo.setCity( this._city.value);
    modifyCompanyInfo.setStreet( this._street.value);
    modifyCompanyInfo.setPostal( this._postal.value);
    modifyCompanyInfo.setEmail( this._cEmail.value);
    modifyCompanyInfo.setPhone( this._cPhone.value);
    modifyCompanyInfo.setFax( this._fax.value);
    modifyCompanyInfo.setWebsite( this._website.value);
    modifyCompanyInfo.setGstNo( this._gstNo.value);
    return modifyCompanyInfo;
  }

  private submitCompanyObj( modifyCompanyObj: Company) {
    this._companyInfoForm.disable();
    this._isSubmitting = true;
    this._http.put( this._urlService.modifyCompany, JSON.stringify( modifyCompanyObj), {headers: this._urlService.headerJson})
      .subscribe( data => this.afterSubmit( data),  ( err :HttpErrorResponse)=> this._errService.reportError( err, modifyCompanyObj.toString()));
  }

  private afterSubmit(data: any) {
    this.setModifyValueToCompanyObj( data);
    this._companyInfoForm.enable();
    this.initForm();
    this._isSubmitting = false;
    this._mode = true;
  }

  private setModifyValueToCompanyObj( responseData: any) {
    this._companyObj.setDataFromResponse( responseData);
  }

  cancel(){
    if( this._isSubmitting){
      return;
    }
    this._mode = true;
    this.initForm();
  }

  modifyCompanyInfo(){
    this._mode = false;
  }

  displayValue( value: string){
    if( value){
      return value;
    }
    return "-";
  }

  private checkHasError(formControlObj: FormControl): boolean {
    return formControlObj.touched && !formControlObj.valid;
  }

  private checkEmptyValue(formControlObj: FormControl): boolean {
    return formControlObj.touched && formControlObj.getError('required');
  }
  private checkAllConditionPassed(): boolean{
    let notValidFormCondition :boolean = !this._companyInfoForm.valid;
    let doSubmitEvent: boolean = this._isSubmitting;
    return doSubmitEvent || notValidFormCondition
  }
}
