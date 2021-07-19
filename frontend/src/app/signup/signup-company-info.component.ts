import {Component, OnInit, AfterViewInit}  from "@angular/core";
import {Router}             from "@angular/router";
import {FormGroup, FormBuilder, FormControl, Validators, AbstractControl} from "@angular/forms";

import {SignupService}                       from "../_service/signup.service";
import {CommonDataService, Country, Province}   from "../_service/common-data.service";
import {SignupValidator} from "../_validator/signup.validator";
import {User}      from "../_model/user";
import {Company}         from "../_model/company";
import {SignupComponent} from "./signup.component";

/**
 * Created by Joinsu on 2017-05-11.
 */
@Component({
  selector: 'coims-signup-company-info',
  templateUrl: './signup-company-info.component.html',
  styleUrls: ['./signup-company-info.component.css']
})
export class SignupCompanyInfoComponent implements OnInit, AfterViewInit {
  private _consultantObj: User;

  private _companyObj: Company;
  private _countries: Country[];
  private _provinces: Province[];

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

  constructor(private _signupService: SignupService,
              private _commonDataService: CommonDataService,
              private _fb: FormBuilder,
              private _router: Router,
              private _parent: SignupComponent) {
  }

  ngOnInit(): void {
    this.checkConsultantObj();
    this.initProgressBar();
    this.initConsultantObj();
    this.initCompanyObj();
    this.initForm();
    this.initData();
  }

  ngAfterViewInit(): void {
    this._parent.cdref.detectChanges();
  }

  private checkConsultantObj() {
    if (this._signupService.isNullConsultantObj()) {
      this._signupService.moveToStep(this._router, 1);
    }
  }

  private initProgressBar() {
    this._signupService.progressBarObj.currentStep = 2;
  }

  private initConsultantObj() {
    this._consultantObj = this._signupService.consultantObj;
  }

  private initCompanyObj() {
    if (this._signupService.isNullConsultantObj()) {
      this._companyObj = this._signupService.getNewCompanyObj();
    } else {
      this._companyObj = this._consultantObj.getCompany();
    }
  }

  private initForm() {
    this._cName = new FormControl(this._companyObj.getName(), {updateOn: 'blur', validators: Validators.required});
    this._street = new FormControl(this._companyObj.getStreet(), {updateOn: 'blur', validators: Validators.required});
    this._city = new FormControl(this._companyObj.getCity(), {updateOn: 'blur', validators: Validators.required});
    this._postal = new FormControl(this._companyObj.getPostal(), {updateOn: 'blur', validators: Validators.required});
    this._cPhone = new FormControl(this._companyObj.getPhone(), {
      updateOn: 'blur',
      validators: Validators.compose([Validators.required, Validators.pattern(SignupValidator.phoneNoRegExp)])
    });
    this._cEmail = new FormControl(this._companyObj.getEmail(), {
      updateOn: 'blur',
      validators: Validators.compose([Validators.required, Validators.pattern(SignupValidator.emailRegExp)])
    });
    this._country = new FormControl(this._companyObj.getCountry());
    this._province = new FormControl(this._companyObj.getProvince());
    this._website = new FormControl(this._companyObj.getWebsite());
    this._fax = new FormControl(this._companyObj.getFax());

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
      fax: this._fax
    });
  }

  private initData() {
    this._countries = this._commonDataService.countries;
    this._provinces = this._commonDataService.provinces;
  }

  private checkHasError(formControlObj: FormControl): boolean {
    return formControlObj.touched && !formControlObj.valid;
  }

  private checkEmptyValue(formControlObj: FormControl): boolean {
    return formControlObj.touched && formControlObj.getError('required');
  }

  private setValueAndGoNextStep() {
    this.setFormValueToConsultantObj();
    this.nextStep();
  }

  private setFormValueToConsultantObj() {
    this._companyObj.setName( this._cName.value);
    this._companyObj.setStreet( this._street.value);
    this._companyObj.setCity( this._city.value);
    this._companyObj.setPostal( this._postal.value);
    this._companyObj.setPhone( this._cPhone.value);
    this._companyObj.setEmail( this._cEmail.value);
    this._companyObj.setCountry( this._country.value);
    this._companyObj.setProvince( this._province.value);
    this._companyObj.setWebsite( this._website.value);
    this._companyObj.setFax( this._fax.value);
  }

  private nextStep() {
    this._signupService.nextStep(this._router);
  }

}
