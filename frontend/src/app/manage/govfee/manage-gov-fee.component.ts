import {Component, OnInit} from "@angular/core";
import {MainService} from "../../_service/main.service";
import {CommonService} from "../../_service/common.service";
import {MainComponent} from "../../main/main.component";
import {CaseTypeCategory, CaseType} from "../../_model/case-type";
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {RestfulUrlService} from "../../_service/restful-url.service";
import {DataLoadService} from "../../_service/data-load.service";
import {ErrorService} from "../../_service/error.service";
import {SignupValidator} from "../../_validator/signup.validator";
/**
 * Created by Joinsu on 2018-08-31.;
 */
@Component({
  selector:'coims-manage-gov-fee',
  templateUrl: 'manage-gov-fee.component.html',
  providers: []
})
export class ManageGovFeeComponent implements OnInit{

  private _caseTypeCategory: CaseTypeCategory;
  private _categoryKeyList: Array<string>;
  private _formGroupObj: {};
  private _modifyFlagObj: {};
  private _dollarString: string;
  private _centString: string;

  constructor(private _commonService: CommonService,
              private _mainService: MainService,
              private _urlService: RestfulUrlService,
              private _dataLoadService: DataLoadService,
              private _errService: ErrorService,
              private _parent: MainComponent,
              private _http: HttpClient,
              private _fb: FormBuilder,
  ){}

  ngOnInit(): void {
    this._mainService.changeMenu( this._mainService.leftMenuFactory.GOVFEE);
    this.initValuables();
    this.initForm();
    this._parent.detectChanges();
  }

  private initValuables() {
    this._dollarString = '.dollar';
    this._centString = '.cent';
    this._caseTypeCategory = new CaseTypeCategory();
    this._categoryKeyList = Object.keys( this._caseTypeCategory);
    this.setModifyFlag();
    this._commonService.getCaseTypeCategory().subscribe( (obj: CaseTypeCategory) => {this.setCaseTypeCategory( obj);});
  }

  private initForm() {
    this.initFormGroup();
    this.initFormControl();
  }

  private initFormGroup() {
    let formGroupObj = {};
    for( let key of this._categoryKeyList){
      formGroupObj[ key] = this._fb.group({});
    }
    this._formGroupObj = formGroupObj;
  }

  private initFormControl() {
    for( let caseTypeKey of this._categoryKeyList){
      let caseTypeFormControl = {};
      this.setFormControlObj( this._caseTypeCategory[ caseTypeKey], caseTypeFormControl);
      this._formGroupObj[ caseTypeKey] = this._fb.group( caseTypeFormControl);
    }
  }

  private setFormControlObj( caseTypeList: Array<CaseType>, caseTypeFormControl: Object) {
    for( let caseType of caseTypeList){
      if( caseType.getHasChild()){
        this.setFormControlObj( caseType.chlidCaseTypeList, caseTypeFormControl);
      }else{
        caseTypeFormControl[ this.getDollarControlName( caseType.getCode())] = this.getDollarFormControl( caseType);
        caseTypeFormControl[ this.getCentControlName( caseType.getCode())] = this.getCentFormControl( caseType);
      }
    }
  }

  private setModifyFlag() {
    let modifyFlagObj = {};
    for( let key in this._categoryKeyList){
      modifyFlagObj[ key] = false;
    }
    this._modifyFlagObj = modifyFlagObj;
  }

  private getDollarFormControl( caseType?:CaseType): FormControl{
    return new FormControl( this.getDollar(caseType.getGovernmentFee()), {updateOn: 'blur', validators: Validators.compose([ Validators.required, Validators.pattern( SignupValidator.caseFeeDollarExp)])});
  }

  private getCentFormControl( caseType?:CaseType): FormControl{
    return new FormControl( this.getCent(caseType.getGovernmentFee()), {updateOn: 'blur', validators: Validators.compose([ Validators.required, Validators.pattern( SignupValidator.caseFeeCentExp)])});
  }

  private setCaseTypeCategory(obj: CaseTypeCategory) {
    if( obj !== null){
      this._caseTypeCategory = obj;
      this.initForm();
    }
  }

  private changeMode( key: string){
    this._modifyFlagObj[ key] = !this._modifyFlagObj[ key];
    this.initForm();
  }

  private isModifyMode( key: string){
    return this._modifyFlagObj[ key];
  }

  private submit( key: string){
    let modifyCaseTypeList: Array<CaseType> = this.setCaseTypeFeeValueToModifyList( key);
    this.modifyGovernmentFee( modifyCaseTypeList);
    this.changeMode( key);
  }

  private setCaseTypeFeeValueToModifyList(key: string): Array<CaseType> {
    let modifyCaseTypeList = new Array<CaseType>();
    let formGroup: FormGroup = this._formGroupObj[ key];
    let caseTypeList: Array<CaseType> = this._caseTypeCategory[key];
    return this.setCaseTypeFeeValue( caseTypeList, formGroup, modifyCaseTypeList);
  }

  private setCaseTypeFeeValue(caseTypeList: Array<CaseType>, formGroup: FormGroup, modifyCaseTypeList: Array<CaseType>): Array<CaseType>{
    for( let caseType of caseTypeList){
      if( caseType.getHasChild()){
        this.setCaseTypeFeeValue( caseType.chlidCaseTypeList, formGroup, modifyCaseTypeList);
      }else{
        modifyCaseTypeList.push( this.getModifyCaseTypeObj( caseType, formGroup));
      }
    }
    return modifyCaseTypeList;
  }

  private getModifyCaseTypeObj( caseType: CaseType, formGroup: FormGroup): CaseType {
    let formControls: any = formGroup.controls;
    let dollar: number = formControls[ this.getDollarControlName( caseType.getCode())].value;
    let cents: number = formControls[ this.getCentControlName( caseType.getCode())].value;
    let modifyCaseType: CaseType = new CaseType();
    modifyCaseType.setId( caseType.getId());
    modifyCaseType.setCode( caseType.getCode());
    modifyCaseType.setCompanyId( this._commonService.user.getCompany().getId());
    modifyCaseType.setGovernmentFee( Number( dollar + '.' + cents));
    modifyCaseType.setCaseTypeFeeId( caseType.getCaseTypeFeeId());
    return modifyCaseType;
  }

  private getDollarControlName(code: string){
    return code + this._dollarString;
  }

  private getCentControlName(code: string){
    return code + this._centString;
  }

  private modifyGovernmentFee(modifyCaseTypeList: Array<CaseType>) {
    this._http.post( this._urlService.modifyGovernmentFee, JSON.stringify( modifyCaseTypeList), {headers: this._urlService.headerJson})
      .subscribe( data => this.afterSubmit(data), ( err :HttpErrorResponse)=> this.afterError( err, JSON.stringify( modifyCaseTypeList)));
  }

  private getDollar( caseFee: number){
    return this._commonService.getIntegerFromFee( caseFee);
  }

  private getCent( caseFee: number): string{
    return this._commonService.getDecimalFromFee( caseFee);
  }

  private deleteFrontZero( key, code){
    return this._commonService.deleteFrontZeroFromInteger( this.getFormControlObj( key, code));
  }

  private addEndZero( key, code){
    let formControlObj: object = this._formGroupObj[key].controls;
    return this._commonService.addZeroToSingleDecimal( this.getFormControlObj( key, code));
  }

  private getFormControlObj(key: string, code: string) {
    let formControlObj: object = this._formGroupObj[key].controls;
    return formControlObj[ code];
  }

  private afterSubmit(data: any) {
    this._dataLoadService.reLoadedCaseTypeCategory( data);
  }

  private afterError( err: HttpErrorResponse, evidenceObj: Object) {
    this._errService.reportError( err, evidenceObj.toString());
  }

  private scrollTo( target: string){
    document.querySelector( "#"+target).scrollIntoView();
  }

  private scrollToTop(){
    window.scrollTo(0, 0);
  }
}
