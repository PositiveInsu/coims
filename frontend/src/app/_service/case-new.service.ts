import {Injectable, OnInit, ComponentRef} from "@angular/core";
import {NewCaseStep} from "../_model/new-case-step";
import {NewCaseDto} from "../_model/case-dto";
import {CaseNewPersonalInfoDependentComponent} from "../case/new/case-new-personal-info-dependent.component";
import {Router} from "@angular/router";
import {User} from "../_model/user";
import {CaseFee, OtherFee} from "../_model/case-fee";
import {CaseNewFeeDependentComponent} from "../case/new/case-new-fee-dependent.component";
import {CaseDocument} from "../_model/case-document";
import {CaseNewDocumentDependentComponent} from "../case/new/case-new-document-dependent.component";
import {CaseGradeType} from "../_model/case-grade-type";
/**
 * Created by Joinsu on 2018-12-14.
 */
@Injectable()
export class CaseNewService{

  private _newCaseStepObj: NewCaseStep;
  private _caseDtoContainerList: Array<CaseDtoContainer>;
  private _MAIN_CASE_NUMBER: number = 0;
  private _caseNumber: number;
  private _caseNewStepUrl: string = '/case/new/step';
  private _caseGradeType: CaseGradeType = new CaseGradeType();

  constructor() {}

  get MAIN_CASE_NUMBER(): number {
    return this._MAIN_CASE_NUMBER;
  }

  set caseNumber(value: number) {
    this._caseNumber = value;
  }

  get newCaseStepObj(): NewCaseStep {
    if( !this._newCaseStepObj){
      this._newCaseStepObj = new NewCaseStep();
    }
    return this._newCaseStepObj;
  }

  get caseDtoContainerList(): Array<CaseDtoContainer> {
    return this._caseDtoContainerList;
  }

  public initCaseDtoContainerList(): Array<CaseDtoContainer>{
    this._caseNumber = this._MAIN_CASE_NUMBER;
    this._caseDtoContainerList = new Array<CaseDtoContainer>();
    this.addCaseDtoToContainerList( this._MAIN_CASE_NUMBER);
    return this._caseDtoContainerList;
  }

  public destroyCaseDtoContainerList(): void{
    this._caseDtoContainerList = null;
  }

  public getNewCaseNumber(): number{
    if( this._caseDtoContainerList){
      this._caseNumber += 1;
      return this._caseNumber;
    }else{
      throw "Init CaseDtoContainerList first.";
    }
  }

  public isNullCaseDtoContainerList(): boolean{
    if( this._caseDtoContainerList){
      return false;
    }else{
      return true;
    }
  }

  public getCaseDto( caseNumber: number): NewCaseDto {
    for( let container of this._caseDtoContainerList){
      if( container.caseNumber == caseNumber){
        return container.caseDto;
      }
    }
  }

  public addCaseDtoToContainerList( caseNumber: number, componentRef?: ComponentRef<CaseNewPersonalInfoDependentComponent>): void{
    if( this.isDuplicateCaseNumber( caseNumber)){
      throw "Case Number Already Exist!";
    }else{
      this._caseDtoContainerList.push( new CaseDtoContainer( caseNumber, new NewCaseDto(), componentRef));
    }
  }

  private isDuplicateCaseNumber(caseNumber: number): boolean {
    for( let container of this._caseDtoContainerList){
      if( container.caseNumber == caseNumber){
        return true;
      }
    }
    return false;
  }

  public removeCaseDtoFromContainerList(caseNumber: number): void{
    for( let i = 0; i < this._caseDtoContainerList.length; i++){
      if ( this._caseDtoContainerList[i].caseNumber == caseNumber) {
      this._caseDtoContainerList[i].caseComponent.hostView.destroy();
        this._caseDtoContainerList.splice(i, 1);
      }
    }
  }

  public isDependentPersonalInfoValid(): boolean{

    if( this._caseDtoContainerList.length === 1){
      return true;
    }

    let flag: boolean = true;

    for( let i = 1; i < this._caseDtoContainerList.length; i++){
      if( !this._caseDtoContainerList[i].caseComponent.instance.isPersonalInfoValid()){
        return false;
      }
    }

    return flag;
  }

  public isDependentFeeInfoValid(): boolean{
    if( this._caseDtoContainerList.length === 1){
      return true;
    }

    let flag: boolean = true;

    for( let i = 1; i < this._caseDtoContainerList.length; i++){
      if( !this._caseDtoContainerList[i].caseFeeComponent.instance.isFeeInfoValid()){
        return false;
      }
    }

    return flag;
  }

  public previousStep( router: Router): void{
    router.navigate([ this._caseNewStepUrl + (this._newCaseStepObj.currentStep - 1)]);
    this._newCaseStepObj.previousStep();
  }

  public nextStep( router: Router): void{
    router.navigate([ this._caseNewStepUrl + (this._newCaseStepObj.currentStep + 1)]);
    this._newCaseStepObj.nextStep();
  }

  public moveToStep( router: Router, stepNumber: number): void{
    router.navigate([ this._caseNewStepUrl + stepNumber]);
  }

  public setMainAppilcantDataToDto( mainApplicant: User): void {
    this._caseDtoContainerList[ this._MAIN_CASE_NUMBER].caseDto.setUser( mainApplicant);
    this._caseDtoContainerList[ this._MAIN_CASE_NUMBER].caseDto.setCaseGrade( this._caseGradeType.MAIN);
  }

  public setDependentDataToDto(): void {
    if( this._caseDtoContainerList.length > 1){
      for( let i = 1; i < this._caseDtoContainerList.length; i++){
        this._caseDtoContainerList[i].caseDto.setUser( this._caseDtoContainerList[i].caseComponent.instance.getDependentUser());
        this._caseDtoContainerList[i].caseDto.setCaseGrade( this._caseGradeType.DEPENDENT);
      }
    }
  }

  public resetCaseFee(): void {
    for( let i = 0; i < this._caseDtoContainerList.length; i++){
      this._caseDtoContainerList[i].caseDto.setCaseFee( new CaseFee());
    }
  }

  public setMainFeeDataToDto( mainCaseFee: CaseFee): void {
    this._caseDtoContainerList[ this._MAIN_CASE_NUMBER].caseDto.setCaseFee( mainCaseFee);
  }

  public setOtherFeeFromList( caseFee: CaseFee): CaseFee{
    let otherFeeList: Array<OtherFee> = caseFee.otherFeeList;
    for( let i = 0; i < otherFeeList.length; i++){
      this.setOtherFeeToCaseFeeObj( i, otherFeeList, caseFee);
    }
    return caseFee;
  }

  public setOtherFeeToCaseFeeObj( no: number, otherFeeList: Array<OtherFee>, caseFee: CaseFee) {
    if( no == 0){
      caseFee.setOther1( otherFeeList[no].fee);
      caseFee.setOtherNote1( otherFeeList[no].note);
    }else if( no == 1){
      caseFee.setOther2( otherFeeList[no].fee);
      caseFee.setOtherNote2( otherFeeList[no].note);
    }else if( no == 2){
      caseFee.setOther3( otherFeeList[no].fee);
      caseFee.setOtherNote3( otherFeeList[no].note);
    }
  }

  public setDependentFeeDataToDto(): void{
    if( this._caseDtoContainerList.length > 1){
      for( let i = 1; i < this._caseDtoContainerList.length; i++){
        this._caseDtoContainerList[i].caseDto.setCaseFee( this._caseDtoContainerList[i].caseFeeComponent.instance.getDependentCaseFee());
      }
    }
  }

  public setFirstCaseStep(): void{
    this._newCaseStepObj.firstStep();
  }

  public getApplicantHeader( caseDto: NewCaseDto): string{
    if( caseDto){
      return caseDto.getUser().getFName() + ' ' + caseDto.getUser().getLName() + ' (' + caseDto.getCaseType().getCode() + ')';
    }
    return "";
  }

  public setMainDocumentDataToDto(applicantDocList: Array<CaseDocument>): void {
    this._caseDtoContainerList[ this._MAIN_CASE_NUMBER].caseDto.setDocumentList( applicantDocList);
  }

  public setDependentDocumentDataToDto(): void {
    if( this._caseDtoContainerList.length > 1){
      for( let i = 1; i < this._caseDtoContainerList.length; i++){
        this._caseDtoContainerList[i].caseDto.setDocumentList( this._caseDtoContainerList[i].caseDocumentComponent.instance.getDependentDocumentList());
      }
    }
  }
}

export class CaseDtoContainer{
  private _caseNumber: number;
  private _caseDto: NewCaseDto;
  private _caseComponent: ComponentRef<CaseNewPersonalInfoDependentComponent>;
  private _caseFeeComponent: ComponentRef<CaseNewFeeDependentComponent>
  private _caseDocumentComponent: ComponentRef<CaseNewDocumentDependentComponent>

  constructor(caseNumber: number, caseDto: NewCaseDto, componentRef: ComponentRef<CaseNewPersonalInfoDependentComponent>) {
    this._caseNumber = caseNumber;
    this._caseDto = caseDto;
    this._caseComponent = componentRef;
  }

  get caseNumber(): number {
    return this._caseNumber;
  }

  get caseDto(): NewCaseDto {
    return this._caseDto;
  }

  get caseComponent(): ComponentRef<CaseNewPersonalInfoDependentComponent> {
    return this._caseComponent;
  }

  set caseComponent(value: ComponentRef<CaseNewPersonalInfoDependentComponent>) {
    this._caseComponent = value;
  }

  get caseFeeComponent(): ComponentRef<CaseNewFeeDependentComponent> {
    return this._caseFeeComponent;
  }

  set caseFeeComponent(value: ComponentRef<CaseNewFeeDependentComponent>) {
    this._caseFeeComponent = value;
  }

  get caseDocumentComponent(): ComponentRef<CaseNewDocumentDependentComponent> {
    return this._caseDocumentComponent;
  }

  set caseDocumentComponent(value: ComponentRef<CaseNewDocumentDependentComponent>) {
    this._caseDocumentComponent = value;
  }
}
