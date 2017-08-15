import {Component}              from "@angular/core";
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";
import {SignupService}                       from "../_service/signup.service";
import {CountryService, Country, Province}   from "../_service/country.service";
import {SignupValidator} from "../_validator/signup.validator";
import {Consultant} from "../_model/consultant";
import {Company} from "../_model/company";


/**
 * Created by Joinsu on 2017-05-11.
 */
@Component({
  selector: 'coims-signup-company-info',
  templateUrl: './signup-company-info.component.html',
  styleUrls: ['./signup-company-info.component.css']
})
export class SignupCompanyInfoComponent{
  private _consultantObj: Consultant;

  private _companyObj: Company = new Company;
  private _countries: Country[];
  private _provinces: Province[];

  private _companyInfoForm: FormGroup;
  private _cName: FormControl;
  private _country: FormControl;
  private _province: FormControl;
  private _street: FormControl;
  private _city: FormControl;
  private _postal: FormControl;
  private _cPhone: FormControl;
  private _cEmail: FormControl;
  private _website: FormControl;
  private _fax: FormControl;

  constructor( private signupService: SignupService,
               private countryService: CountryService,
               private fb:FormBuilder){

    this._countries = this.countryService.countries;
    this._provinces = this.countryService.provinces;
    this.initProgressBar();
    this.checkConsultantObj();
    this.initConsultantObj();
    this.initForm();
  }

  private initProgressBar(){
    this.signupService.progressBarObj.currentStep = 2;
  }

  private checkConsultantObj(){
  }

  private initConsultantObj() {
    console.log( this.signupService);
    this._consultantObj = this.signupService.consultantObj;
    this._companyObj = this._consultantObj.company;
  }

  private initForm(){
    this._cName = new FormControl( '', Validators.required);
    this._street = new FormControl( '', Validators.required);
    this._city = new FormControl( '', Validators.required);
    this._postal = new FormControl( '', Validators.required);
    this._cPhone = new FormControl( '', Validators.compose([ Validators.required, Validators.pattern( SignupValidator.phoneNoRegExp)]));
    this._cEmail = new FormControl( '', Validators.compose([ Validators.required, Validators.pattern( SignupValidator.emailRegExp)]));
    this._country = new FormControl( '');
    this._province = new FormControl( '');
    this._website = new FormControl( '');
    this._fax = new FormControl( '');

    this._companyInfoForm = this.fb.group({
      cName: this._cName,
      street: this._street,
      city: this._city,
      postal: this._postal,
      cPhone: this._cPhone,
      cEmail: this._cEmail,
      country: this._country,
      province: this._province,
      website: this._website,
      fax: this._fax
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
