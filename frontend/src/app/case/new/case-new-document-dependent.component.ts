import {Component, OnInit, Input} from "@angular/core";
import {NewCaseDto} from "../../_model/case-dto";
import {CaseDocument} from "../../_model/case-document";
import {CaseNewService} from "../../_service/case-new.service";
import {FormGroup, AbstractControl, FormBuilder, FormControl} from "@angular/forms";
import {CaseDocumentType} from "../../_model/case-document-type";
import {CommonService} from "../../_service/common.service";
/**
 * Created by Joinsu on 2019-04-09.
 */
@Component({
  selector:'case-new-document-dependent',
  templateUrl: 'case-new-document-dependent.component.html',
  providers: []
})
export class CaseNewDocumentDependentComponent implements OnInit{

  @Input() existedCaseDto: NewCaseDto;

  private _caseDocumentList: Array<CaseDocument>;
  private _supportDocumentList: Array<CaseDocument>;
  private _additionalDocumentList: Array<CaseDocument>;
  private _moreDocumentList: Array<CaseDocument>;
  private _exceptDocList: Array<number>;
  private _categoryTypeObj: CaseDocumentType;

  private _moreFormGroup: FormGroup;
  private _docName: AbstractControl;
  private _docListFormGroup: FormGroup;

  constructor( private _commonService: CommonService,
               private _caseNewService: CaseNewService,
               private _fb: FormBuilder,
  ){}

  ngOnInit(): void {
    this.initValuables();
    this.initForm();
    this.initSupportAdditionalDocList();
    this.initData();
  }

  private initValuables() {
    this._caseDocumentList = this.existedCaseDto.getCaseType().getDocumentList();
    this._moreDocumentList = new Array<CaseDocument>();
    this._supportDocumentList = new Array<CaseDocument>();
    this._additionalDocumentList = new Array<CaseDocument>();
    this._exceptDocList = new Array<number>();
    this._categoryTypeObj = new CaseDocumentType();
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

  private initData() {
    if( this.existedCaseDto.getDocumentList()){
      this._exceptDocList = this.getDefaultDocIdList();
      for( let caseDocument of this.existedCaseDto.getDocumentList()){
        this.setMoreDocumentData( caseDocument);
        this.setExceptDocListData( caseDocument);
      }
      this.unCheckedExceptDoc();
    };
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

  private getDefaultDocIdList(): Array<number>{
    let defaultDocIdList: Array<number> = new Array<number>();
    for(let caseDocument of this._caseDocumentList){
      defaultDocIdList.push( caseDocument.getId());
    }
    return defaultDocIdList;
  }

  private unCheckedExceptDoc() {
    for( let exceptDocId of this._exceptDocList){
      this._docListFormGroup.get( this.getControlName( exceptDocId)).setValue( false);
    }
  }

  private getApplicantHeader(): string{
    return this._caseNewService.getApplicantHeader( this.existedCaseDto);
  }

  private addDocument(): void{
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

  private deleteMoreDoc( docId: number): void{
    for( let i = 0 ; i < this._moreDocumentList.length ; i++){
      if( this._moreDocumentList[i].getId() === docId){
        this._moreDocumentList.splice( i, 1);
      }
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

  public getDependentDocumentList(): Array<CaseDocument>{
    let applicantDocList: Array<CaseDocument> = new Array<CaseDocument>();
    this.removeExceptDocument( applicantDocList);
    this.setMoreDocument( applicantDocList);
    return applicantDocList;
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
}
