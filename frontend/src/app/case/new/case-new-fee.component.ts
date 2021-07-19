import {Component, OnInit, ViewChild, ComponentFactoryResolver, ComponentRef, OnDestroy} from "@angular/core";
import {CaseNewService, CaseDtoContainer} from "../../_service/case-new.service";
import {Router} from "@angular/router";
import {FormGroup, FormBuilder, AbstractControl, FormControl, Validators} from "@angular/forms";
import {NewCaseDto} from "../../_model/case-dto";
import {RestfulUrlService} from "../../_service/restful-url.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {CommonService} from "../../_service/common.service";
import {ErrorService} from "../../_service/error.service";
import {CaseTypeFee} from "../../_model/case-type-fee";
import {CaseFee, OtherFee} from "../../_model/case-fee";
import {SignupValidator} from "../../_validator/signup.validator";
import {CaseType} from "../../_model/case-type";
import {CaseNewFeeDependentDirective} from "../../_directive/case-new-fee-dependent.directive";
import {CaseNewFeeDependentComponent} from "./case-new-fee-dependent.component";
/**
 * Created by Joinsu on 2019-03-21.
 */
@Component({
  selector:'coims-case-new-fee',
  templateUrl: 'case-new-fee.component.html',
  providers: []
})
export class CaseNewFeeComponent implements OnInit, OnDestroy{

  @ViewChild( CaseNewFeeDependentDirective) dependentFeeDirective;

  private _caseDtoContainerList: Array<CaseDtoContainer>;
  private _mainApplicantDto: NewCaseDto;
  private _caseFee: CaseFee;
  private DISCOUNT: number = 0;
  private EXTRA_CHARGE: number = 1;
  private _total: number;
  private _isNeedOtherFee: boolean;
  private _companyId: number;
  private _isPushNextPreviousStep: boolean;
  private _isNullCaseDto: boolean;

  private _feeInformation: FormGroup;
  private _changeType: AbstractControl;
  private _changeD: AbstractControl;
  private _changeC: AbstractControl;
  private _changeNote: AbstractControl;
  private _taxPercentage: AbstractControl;

  constructor(
              private _commonService: CommonService,
              private _errService: ErrorService,
              private _caseNewService: CaseNewService,
              private _router: Router,
              private _fb: FormBuilder,
              private _http: HttpClient,
              private _urlService: RestfulUrlService,
              private _componentFactoryResolver: ComponentFactoryResolver,
  ){}

  ngOnInit(): void {
    this.checkExistCaseDto();
    this.initValuables();
    this.initForm();
    this.initOtherFee();
    this.initData();
  }

  private checkExistCaseDto(): void{
    this._isNullCaseDto = this._caseNewService.isNullCaseDtoContainerList();
    if( this._isNullCaseDto){
      this._caseNewService.moveToStep(this._router, 1);
    };
  }

  private initValuables(): void {
    this._caseDtoContainerList = this._isNullCaseDto ? this._caseNewService.initCaseDtoContainerList() : this._caseNewService.caseDtoContainerList;
    this._mainApplicantDto = this._caseDtoContainerList[ this._caseNewService.MAIN_CASE_NUMBER].caseDto;
    this._caseFee = this._mainApplicantDto.getCaseFee();
    this._caseFee.initOtherFeeList();
    this._isNeedOtherFee = false;
    this._companyId = this._commonService.user.getCompany().getId();
    this._isPushNextPreviousStep = false;
  }

  private initForm(): void{
    this._changeType = new FormControl( this.getChangeType());
    this._changeD = new FormControl( this.getDollar( this.getDiscountOrExtraValue()), {updateOn: 'blur', validators: Validators.compose([ Validators.pattern( SignupValidator.caseFeeDollarExp)])});
    this._changeC = new FormControl( this.getCent( this.getDiscountOrExtraValue()), {updateOn: 'blur', validators: Validators.compose([ Validators.pattern( SignupValidator.caseFeeCentExp)])});
    this._changeNote = new FormControl( this._caseFee.getNote());
    this._taxPercentage = new FormControl( this._caseFee.getTaxPercentage(), {updateOn: 'blur', validators: Validators.compose([ Validators.pattern( SignupValidator.caseFeePercentageExp)])});

    this._feeInformation = this._fb.group({
      changeD: this._changeD,
      changeC: this._changeC,
      changeNote: this._changeNote,
      changeType: this._changeType,
      taxPercentage: this._taxPercentage,
    });
  }

  private initOtherFee(): void{
    if( this.isHasOtherFeeData()){
      this._isNeedOtherFee = true;
    }
  }

  private isHasOtherFeeData() {
    for( let otherFee of this._caseFee.otherFeeList){
      if( otherFee.fee){
        return true;
      }
    }
    return false;
  }

  private initData(): void{
    if( !this._isNullCaseDto){
      this.setCaseFee();
      this.setGovernmentFee();
      this.initDependetFee();
    }
  }

  private getApplicantHeader(): string{
    if( !this._isNullCaseDto){
      return this._caseNewService.getApplicantHeader( this._mainApplicantDto);
    }
  }

  private setCaseFee(): void{
    let param: Object = {
      "caseTypeId": this._mainApplicantDto.getCaseType().getId(),
      "companyId": this._companyId
    };

    this._http.post( this._urlService.findCaseTypeFee, JSON.stringify( param), {headers: this._urlService.headerJson})
      .subscribe( responseData => this.afterFindCaseTypeFee( responseData), (err :HttpErrorResponse)=> this.afterError( err, JSON.stringify( param)));
  }

  private setGovernmentFee(): void{
    let caseTypeCode: string = this._mainApplicantDto.getCaseType().getCode();
    this._http.post( this._urlService.findCaseType, caseTypeCode, {headers: this._urlService.headerTextPlain})
      .subscribe( responseData => this.afterFindGovernmentFee( responseData), (err :HttpErrorResponse)=> this.afterError( err, caseTypeCode));
  }

  private afterFindCaseTypeFee( responseData: any): void {
    let caseTypeFee: CaseTypeFee = new CaseTypeFee();
    caseTypeFee.setDataFromResponse( responseData);

    this._caseFee.setBasic( caseTypeFee.getFee());

    if( !this._caseFee.getSubTotal()){
      this._caseFee.setSubTotal( this._caseFee.getBasic());
    }

    this.changeConsultantFee();
  }

  private afterFindGovernmentFee( responseData: Object): void {
    let caseType: CaseType = new CaseType();
    caseType.setDataFromResponse( responseData);

    this._caseFee.setGovernment( caseType.getGovernmentFee());
  }

  private afterError(err: HttpErrorResponse, evidence: string): void {
    this._errService.reportError( err, evidence);
  }

  private getDollar( caseFee: number): number{
    return this._commonService.getIntegerFromFee( caseFee);
  }

  private getCent( caseFee: number): string{
    return this._commonService.getDecimalFromFee( caseFee);
  }

  private getDiscountOrExtraValue(): number{
    if( this._caseFee.getDiscount() && this._caseFee.getDiscount() != 0){
      return this._caseFee.getDiscount();
    }
    if( this._caseFee.getExtra() && this._caseFee.getExtra() != 0){
      return this._caseFee.getExtra();
    }
  }

  private getChangeType(): number {
    if( this._caseFee.getDiscount()){
      return this.DISCOUNT;
    }
    if( this._caseFee.getExtra()){
      return this.EXTRA_CHARGE;
    }
    return this.DISCOUNT
  }

  private changeConsultantFee(): void{
    this.validateFeeValue( this._changeD, this._changeC);
    let basicFee: number = this._caseFee.getBasic();
    let changeFee: number = this.getFeeFromForm( this._changeD, this._changeC);
    this.changeSubTotal( basicFee, changeFee);
    this.changeTax();
    this.changeTotal();
  }

  private validateFeeValue( dollarForm: AbstractControl, centForm: AbstractControl): void{
    this._commonService.deleteFrontZeroFromInteger( dollarForm);
    this._commonService.addZeroToSingleDecimal( centForm);
  }

  private getFeeFromForm( dollarForm: AbstractControl, centForm: AbstractControl): number{
    return Number( dollarForm.value + '.' + centForm.value);
  }

  private changeSubTotal( basicFee: number, changeFee: number) {
    let subTotal: number = 0;
    if( this._changeType.value == this.DISCOUNT){
      subTotal = basicFee - changeFee;
    }
    if( this._changeType.value == this.EXTRA_CHARGE){
      subTotal = basicFee + changeFee;
    }
    this._caseFee.setSubTotal( subTotal);
  }

  private changeTax() {
    this._commonService.deleteFrontZeroFromInteger( this._taxPercentage);
    let tax = this._caseFee.getSubTotal() * Number( this._taxPercentage.value) / 100;
    this._caseFee.setTax( tax);
  }

  private changeTotal() {
    let subTotal = this._caseFee.getSubTotal();
    let total = subTotal + this._caseFee.getTax();
    this._total = total;
  }

  private otherFeeToggle( isNeed: boolean){
    if( isNeed){
      this._isNeedOtherFee = true;
    }else{
      this._isNeedOtherFee = false;
      this._caseFee.initOtherFeeList();
    }
  }

  private setOtherFee( otherFeeObj: OtherFee){
    this._caseFee.otherFeeList[ otherFeeObj.no].note = otherFeeObj.note;
    this._caseFee.otherFeeList[ otherFeeObj.no].fee = otherFeeObj.fee;
  }

  private initDependetFee(): void{
    if( this._caseDtoContainerList.length > 1){
      for( let i = 1; i < this._caseDtoContainerList.length; i++){
        this._caseDtoContainerList[i].caseFeeComponent = this.addDependent( this._caseDtoContainerList[i]);
      }
    }
  }

  private addDependent( caseDtoContainer: CaseDtoContainer): ComponentRef<CaseNewFeeDependentComponent>{
    let dependentComponent = this._componentFactoryResolver.resolveComponentFactory( CaseNewFeeDependentComponent);
    let viewContainerRef = this.dependentFeeDirective.viewContainerRef;
    let dependentComponentRef: ComponentRef<CaseNewFeeDependentComponent> = viewContainerRef.createComponent( dependentComponent);
    dependentComponentRef.instance.existedCaseDto = caseDtoContainer.caseDto;
    dependentComponentRef.instance.companyId = this._companyId;
    return dependentComponentRef;
  }

  private previousStep(){
    this._isPushNextPreviousStep = true;
    this._caseNewService.resetCaseFee();
    this._caseNewService.previousStep( this._router);
  }

  private checkHasError( formControlObj:FormControl): boolean{
    return formControlObj.touched && !formControlObj.valid;
  }

  private nextStep(): void{
    if( this.isFeeInfoValid()){
      this.setCaseFeeObjFromForm();
      this._caseNewService.setDependentFeeDataToDto();
      this._isPushNextPreviousStep = true;
      this._caseNewService.nextStep( this._router);
    }
  }

  private isFeeInfoValid(): boolean{
    if( this._feeInformation.valid && this._caseNewService.isDependentFeeInfoValid()){
      return true;
    }
    return false;
  }

  private setCaseFeeObjFromForm(): void{
    this.setChangeFeeAndNoteFromForm();
    this._caseFee = this._caseNewService.setOtherFeeFromList( this._caseFee);
    this._caseNewService.setMainFeeDataToDto( this._caseFee);
  }

  private setChangeFeeAndNoteFromForm(): void{
    let changeFee = this.getFeeFromForm( this._changeD, this._changeC);
    if( this._changeType.value == this.DISCOUNT){
      this._caseFee.setExtra( null);
      this._caseFee.setDiscount( changeFee);
    }
    if( this._changeType.value == this.EXTRA_CHARGE){
      this._caseFee.setDiscount( null);
      this._caseFee.setExtra( changeFee);
    }
    this._caseFee.setNote( this._changeNote.value);
  }

  ngOnDestroy(): void {
    if( !this._isPushNextPreviousStep){
      this._caseNewService.destroyCaseDtoContainerList();
    }
  }
}















