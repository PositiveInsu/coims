import {Component}              from "@angular/core";
import {Router}                 from "@angular/router";
import {Location}               from "@angular/common";
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";
import {SignupService}                       from "../_service/signup.service";
import {CountryService, Country, Province}   from "../_service/country.service";


/**
 * Created by Joinsu on 2017-05-11.
 */
@Component({
  selector: 'coims-signup-company-info',
  templateUrl: './signup-company-info.component.html',
  styleUrls: ['./signup-company-info.component.css']
})
export class SignupCompanyInfoComponent{
  private _countries: Country[];
  private _provinces: Province[];
  private _companyInfoForm: FormGroup;
  private _cName: FormControl;
  private _sAddress: FormControl;

  constructor( private signupService: SignupService,
               private countryService: CountryService,
               private location: Location,
               private router:Router,
               private fb:FormBuilder){
    this._countries = this.countryService.countries;
    this._provinces = this.countryService.provinces;
    this.initProgressBar();
    this.checkSignupObj();
    this.initForm();
  }

  private initProgressBar(){
    this.signupService.progressBarObj.currentStep = 2;
  }

  private checkSignupObj(){
    console.log( this.signupService.consultantObj);
  }

  private initForm(){
    this._cName = new FormControl( '', Validators.required);
    this._sAddress = new FormControl( '', Validators.required);
    this._companyInfoForm = this.fb.group({
      cName: this._cName,
      sAddress: this._sAddress
    })
  }

  goPreviousPage(){
    this.location.back();
  }

  goNextPage(){
    this.router.navigate( ['/signup/step3']);
  }


}
