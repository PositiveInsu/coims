import {Component, OnInit, Input} from "@angular/core";
import {NewCaseDto} from "../../_model/case-dto";
import {CaseFee, OtherFee} from "../../_model/case-fee";
import {FormBuilder, FormGroup, AbstractControl, FormControl, Validators} from "@angular/forms";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {RestfulUrlService} from "../../_service/restful-url.service";
import {CaseTypeFee} from "../../_model/case-type-fee";
import {ErrorService} from "../../_service/error.service";
import {CommonService} from "../../_service/common.service";
import {CaseType} from "../../_model/case-type";
import {SignupValidator} from "../../_validator/signup.validator";
import {CaseNewService} from "../../_service/case-new.service";
/**
 * Created by Joinsu on 2019-04-02.
 */
@Component({
  selector:'case-new-fee-dependent',
  templateUrl: 'case-new-fee-dependent.component.html',
  providers: []
})
export class CaseNewFeeDependentComponent implements OnInit{

  @Input() existedCaseDto: NewCaseDto;
  @Input() companyId: number;

  private _caseFee: CaseFee;
  private DISCOUNT: number = 0;
  private EXTRA_CHARGE: number = 1;
  private _total: number;
  private _isNeedOtherFee: boolean;

  private _feeDependentInfo: FormGroup;
  private _changeType: AbstractControl;
  private _changeD: AbstractControl;
  private _changeC: AbstractControl;
  private _changeNote: AbstractControl;
  private _taxPercentage: AbstractControl;

  constructor( private _commonService: CommonService,
               private _caseNewService: CaseNewService,
               private _errService: ErrorService,
               private _fb: FormBuilder,
               private _http: HttpClient,
               private _urlService: RestfulUrlService,
  ){}

  ngOnInit(): void {
    this.initValuables();
    this.initForm();
    this.initOtherFee();
    this.setCaseFee();
    this.setGovernmentFee();
  }

  private initValuables() {
    this._caseFee = this.existedCaseDto.getCaseFee();
    this._caseFee.initOtherFeeList();
    this._isNeedOtherFee = false;
  }

  private initForm(): void{
    this._changeType = new FormControl( this.getChangeType());
    this._changeD = new FormControl( this.getDollar( this.getDiscountOrExtraValue()), {updateOn: 'blur', validators: Validators.compose([ Validators.pattern( SignupValidator.caseFeeDollarExp)])});
    this._changeC = new FormControl( this.getCent( this.getDiscountOrExtraValue()), {updateOn: 'blur', validators: Validators.compose([ Validators.pattern( SignupValidator.caseFeeCentExp)])});
    this._changeNote = new FormControl( this._caseFee.getNote());
    this._taxPercentage = new FormControl( this._caseFee.getTaxPercentage(), {updateOn: 'blur', validators: Validators.compose([ Validators.pattern( SignupValidator.caseFeePercentageExp)])});

    this._feeDependentInfo = this._fb.group({
      changeD: this._changeD,
      changeC: this._changeC,
      changeNote: this._changeNote,
      changeType: this._changeType,
      taxPercentage: this._taxPercentage,
    });
  }

  private initOtherFee() {
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

  private getChangeType(): number {
    if( this._caseFee.getDiscount()){
      return this.DISCOUNT;
    }
    if( this._caseFee.getExtra()){
      return this.EXTRA_CHARGE;
    }
    return this.DISCOUNT
  }

  private getDiscountOrExtraValue(): number{
    if( this._caseFee.getDiscount()){
      return this._caseFee.getDiscount();
    }
    if( this._caseFee.getExtra()){
      return this._caseFee.getExtra();
    }
  }

  private getDollar( caseFee: number): number{
    return this._commonService.getIntegerFromFee( caseFee);
  }

  private getCent( caseFee: number): string{
    return this._commonService.getDecimalFromFee( caseFee);
  }

  private setCaseFee(): void{
    let param: Object = {
      "caseTypeId": this.existedCaseDto.getCaseType().getId(),
      "companyId": this.companyId
    };

    this._http.post( this._urlService.findCaseTypeFee, JSON.stringify( param), {headers: this._urlService.headerJson})
      .subscribe( responseData => this.afterFindCaseTypeFee( responseData), (err: HttpErrorResponse)=> this.afterError( err, JSON.stringify( param)));
  }

  private setGovernmentFee(): void{
    let caseTypeCode: string = this.existedCaseDto.getCaseType().getCode();
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

  private afterError(err: HttpErrorResponse, evidence: string): void {
    this._errService.reportError( err, evidence);
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

  private afterFindGovernmentFee(responseData: Object) {
    let caseType: CaseType = new CaseType();
    caseType.setDataFromResponse( responseData);

    this._caseFee.setGovernment( caseType.getGovernmentFee());
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

  private checkHasError( formControlObj:FormControl): boolean{
    return formControlObj.touched && !formControlObj.valid;
  }

  public isFeeInfoValid(): boolean{
    if( this._feeDependentInfo.valid){
      return true;
    }else{
      return false;
    }
  }

  public getDependentCaseFee(): CaseFee{
    this.setCaseFeeObjFromForm();
    return this._caseFee;
  }

  private setCaseFeeObjFromForm(): void{
    this.setChangeFeeAndNoteFromForm();
    this._caseFee = this._caseNewService.setOtherFeeFromList( this._caseFee);
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

}
