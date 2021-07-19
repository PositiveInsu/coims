import {Component, OnInit, OnDestroy, ViewChild, ComponentRef, ComponentFactoryResolver} from "@angular/core";
import {CommonService} from "../../_service/common.service";
import {ErrorService} from "../../_service/error.service";
import {CaseNewService, CaseDtoContainer} from "../../_service/case-new.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, AbstractControl, FormControl} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {RestfulUrlService} from "../../_service/restful-url.service";
import {NewCaseDto} from "../../_model/case-dto";
import {CaseDocument} from "../../_model/case-document";
import {CaseDocumentType} from "../../_model/case-document-type";
import {CaseNewDocumentDependentDirective} from "../../_directive/case-new-document-dependent.directive";
import {CaseNewDocumentDependentComponent} from "./case-new-document-dependent.component";
/**
 * Created by Joinsu on 2019-04-08.
 */
@Component({
  selector:'coims-case-new-document',
  templateUrl: 'case-new-document.component.html',
  providers: []
})
export class CaseNewDocumentComponent implements OnInit, OnDestroy{

  @ViewChild( CaseNewDocumentDependentDirective) documentDependentDirective;

  private _caseDtoContainerList: Array<CaseDtoContainer>;
  private _mainApplicantDto: NewCaseDto;
  private _caseDocumentList: Array<CaseDocument>;
  private _supportDocumentList: Array<CaseDocument>;
  private _additionalDocumentList: Array<CaseDocument>;
  private _moreDocumentList: Array<CaseDocument>;
  private _exceptDocList: Array<number>;
  private _categoryTypeObj: CaseDocumentType;
  private _isNullCaseDto: boolean;
  private _isPushNextPreviousStep: boolean;

  private _moreFormGroup: FormGroup;
  private _docName: AbstractControl;
  private _docListFormGroup: FormGroup;

  constructor( private _commonService: CommonService,
               private _caseNewService: CaseNewService,
               private _router: Router,
               private _fb: FormBuilder,
               private _componentFactoryResolver: ComponentFactoryResolver,
  ){}

  ngOnInit(): void {
    this.checkExistCaseDto();
    this.initValuables();
    this.initForm();
    this.initSupportAdditionalDocList();
    this.initDependetDocument();
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
    this._caseDocumentList = this._isNullCaseDto ? new Array<CaseDocument>() : this._mainApplicantDto.getCaseType().getDocumentList();
    this._supportDocumentList = new Array<CaseDocument>();
    this._additionalDocumentList = new Array<CaseDocument>();
    this._moreDocumentList = new Array<CaseDocument>();
    this._exceptDocList = new Array<number>();
    this._categoryTypeObj = new CaseDocumentType();
    this._isPushNextPreviousStep = false;
  }

  private initSupportAdditionalDocList() {
    for( let caseDocument of this._caseDocumentList){
      if( caseDocument.getCategory() === this._categoryTypeObj.ADDITIONAL){
        this._additionalDocumentList.push( caseDocument);
      }else if( caseDocument.getCategory() === this._categoryTypeObj.APPLICATION){

      }else{
        this._supportDocumentList.push( caseDocument);
      }
    }
  }

  private addDocumentToMoreDocList(): void{
    let moreDocument: CaseDocument = this.setDocumentData();
    let no: number = this._moreDocumentList.push( moreDocument);
    moreDocument.setId( no);
    this._docName.reset();

  }

  private setDocumentData(): CaseDocument {
    let additionalDocument: CaseDocument = new CaseDocument();
    additionalDocument.setName( this._docName.value);
    additionalDocument.setCategory( this._categoryTypeObj.MORE);
    additionalDocument.setCompanyId( this._commonService.user.getCompany().getId());
    return additionalDocument;
  }

  private initForm(): void{
    this._docName = new FormControl( '');
    this._moreFormGroup = this._fb.group({
      docName: this._docName
    });
    this._docListFormGroup = this._fb.group({});
    for( let caseDocument of this._caseDocumentList){
      this._docListFormGroup.addControl( this.getControlName( caseDocument.getId()), new FormControl( true));

    }
  }

  private getControlName( id: number): string{
    return id + "";
  }

  private initDependetDocument(): void{
    if( this._caseDtoContainerList.length > 1){
      for( let i = 1; i < this._caseDtoContainerList.length; i++){
        this._caseDtoContainerList[i].caseDocumentComponent = this.addDependent( this._caseDtoContainerList[i]);
      }
    }
  }

  private getApplicantHeader(): string{
    if( !this._isNullCaseDto){
      return this._caseNewService.getApplicantHeader( this._mainApplicantDto);
    }
  }

  private deleteMoreDoc( docId: number): void{
    for( let i = 0 ; i < this._moreDocumentList.length ; i++){
      if( this._moreDocumentList[i].getId() === docId){
        this._moreDocumentList.splice( i, 1);
      }
    }
  }

  private initData() {
    if( this.isExistDocData()){
      this._exceptDocList = this.getDefaultDocIdList();
      for( let caseDocument of this._mainApplicantDto.getDocumentList()){
        this.setMoreDocumentData( caseDocument);
        this.setExceptDocListData( caseDocument);
      }
      this.unCheckedExceptDoc();
    };
  }

  private isExistDocData(): boolean {
    if( !this._isNullCaseDto && this._mainApplicantDto.getDocumentList()){
      return true;
    }
    return false;
  }

  private getDefaultDocIdList(): Array<number>{
    let defaultDocIdList: Array<number> = new Array<number>();
    for(let caseDocument of this._caseDocumentList){
      defaultDocIdList.push( caseDocument.getId());
    }
    return defaultDocIdList;
  }

  private setMoreDocumentData( caseDocument: CaseDocument) {
    if( caseDocument.getCategory() === this._categoryTypeObj.MORE){
      let no: number = this._moreDocumentList.push( caseDocument);
      caseDocument.setId( no);
    }
  }

  private setExceptDocListData(caseDocument: CaseDocument) {
    this.isDeleteExistNo( caseDocument.getId());
  }

  private unCheckedExceptDoc() {
    for( let exceptDocId of this._exceptDocList){
      this._docListFormGroup.get(this.getControlName( exceptDocId)).setValue( false);
    }
  }

  private toggleExceptDocList( caseDocumentId: number): void{
    if( !this.isDeleteExistNo( caseDocumentId)){
      this._exceptDocList.push( caseDocumentId);
    };
  }

  private isDeleteExistNo( caseDocumentId: number): boolean {
    for( let i = 0 ; i < this._exceptDocList.length ; i++){
      if( this._exceptDocList[i] === caseDocumentId){
        this._exceptDocList.splice( i, 1);
        return true;
      }
    }
    return false;
  }

  private addDependent( caseDtoContainer: CaseDtoContainer): ComponentRef<CaseNewDocumentDependentComponent>{
    let dependentComponent = this._componentFactoryResolver.resolveComponentFactory( CaseNewDocumentDependentComponent);
    let viewContainerRef = this.documentDependentDirective.viewContainerRef;
    let dependentComponentRef: ComponentRef<CaseNewDocumentDependentComponent> = viewContainerRef.createComponent( dependentComponent);
    dependentComponentRef.instance.existedCaseDto = caseDtoContainer.caseDto;
    return dependentComponentRef;
  }


  private previousStep() {
    this._isPushNextPreviousStep = true;
    this._caseNewService.previousStep(this._router);
  }

  private nextStep(): void{
    this.setCaseDtoDocumentList();
    this._caseNewService.setDependentDocumentDataToDto();
    this._isPushNextPreviousStep = true;
    this._caseNewService.nextStep( this._router);
  }

  private setCaseDtoDocumentList() {
    let applicantDocList: Array<CaseDocument> = new Array<CaseDocument>();
    this.removeExceptDocument( applicantDocList);
    this.setMoreDocument( applicantDocList);
    this._caseNewService.setMainDocumentDataToDto( applicantDocList);
  }

  private removeExceptDocument(applicantDocList: Array<CaseDocument>): void {
    for( let caseDocument of this._caseDocumentList){
      if( !this.isExceptDocument( caseDocument.getId())){
        applicantDocList.push( caseDocument);
      }
    }
  }

  private isExceptDocument(caseDocumentId: number): boolean {
    for( let exceptDocId of this._exceptDocList){
      if( exceptDocId === caseDocumentId){
        return true;
      }
    }
    return false;
  }

  private setMoreDocument(applicantDocList: Array<CaseDocument>) {
    for( let caseDocument of this._moreDocumentList){
      caseDocument.setId( null);
      applicantDocList.push( caseDocument);
    }
  }

  ngOnDestroy(): void {
    if( !this._isPushNextPreviousStep){
      this._caseNewService.destroyCaseDtoContainerList();
    }
  }
}
