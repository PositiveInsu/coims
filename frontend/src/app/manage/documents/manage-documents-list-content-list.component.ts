import {Component, OnInit, Input, EventEmitter, Output} from "@angular/core";
import {CaseType} from "../../_model/case-type";
import {CaseDocument, DocumentCategoryFactory} from "../../_model/case-document";
import {FormGroup, FormBuilder, AbstractControl, FormControl, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {RestfulUrlService} from "../../_service/restful-url.service";
import {ErrorService} from "../../_service/error.service";
import {CommonService} from "../../_service/common.service";
import {DataLoadService} from "../../_service/data-load.service";
import {HttpParams} from "@angular/common/http";
/**
 * Created by Joinsu on 2018-11-30.
 */
@Component({
  selector:'coims-manage-documents-list-content-list',
  templateUrl: './manage-documents-list-content-list.component.html',
  providers: []
})
export class ManageDocumentsListContentListComponent implements OnInit{

  private _caseType: CaseType;
  private _docList: Array<CaseDocument>;
  private _docCategory: {[key:string]: Array<CaseDocument>};
  private _categoryKeyList: Array<string>;
  private _additionalFormGroup: FormGroup;
  private _docName: AbstractControl;
  private _isProcessing: boolean;

  constructor( private _fb: FormBuilder,
               private _http: HttpClient,
               private _urlService: RestfulUrlService,
               private _errService: ErrorService,
               private _commonService: CommonService,
               private _dataLoadService: DataLoadService,
               private _categoryFactory: DocumentCategoryFactory
  ){}

  @Input()
  set caseType( caseType: CaseType) {
    this._caseType = caseType;
  }

  ngOnInit(): void {
    this.initVariables();
    this.initForm();
  }

  private initVariables() {
    this._isProcessing = false;
    this.setDocumentList( this._caseType);
  }

  private setDocumentList( caseType: CaseType) {
    this._docCategory = this._categoryFactory.getCategoryObj();
    this._docList = caseType.getDocumentList();
    this._categoryKeyList = Object.keys( this._docCategory);
    for( let caseTypeDocument of this._docList){
      this._docCategory[ caseTypeDocument.getCategory()].push( caseTypeDocument);
    }
  }

  private initForm() {
    this._docName = new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)]));
    this._additionalFormGroup = this._fb.group({
      docName: this._docName
    });
  }

  private addDocument(){
    this._isProcessing = true;
    let caseTypeDocument: CaseDocument = this.setDocumentData();
    this._http.post( this._urlService.addCaseTypeDocument, { document: caseTypeDocument, caseTypeId: this._caseType.getId()}, { headers: this._urlService.headerJson})
      .subscribe( newCaseType => this.afterSubmit( newCaseType), err => this.afterError( err, caseTypeDocument));
  }

  private setDocumentData(): CaseDocument {
    let additionalDocument: CaseDocument = new CaseDocument();
    additionalDocument.setName( this._docName.value);
    additionalDocument.setCategory( this._categoryFactory.categoryTypeObj.ADDITIONAL);
    additionalDocument.setCompanyId( this._commonService.user.getCompany().getId());
    return additionalDocument;
  }

  private afterSubmit(newCaseType: any) {
    let caseType: CaseType = new CaseType();
    caseType.setDataFromResponse( newCaseType);
    this.setDocumentList( caseType);
    this._dataLoadService.initCaseTypeList();
    this._docName.reset();
    this._isProcessing = false;

  }

  private afterError( err: any, evidence: any) {
    this._errService.reportError( err, evidence);
  }

  private isNotEmptyAndAdditionalCategory( categoryKey: string){
    let isNotEmptyCategory:boolean = this._docCategory[categoryKey].length > 0;
    let isNotAdditionalCategory: boolean = categoryKey != this._categoryFactory.categoryTypeObj.ADDITIONAL;
    return  isNotEmptyCategory && isNotAdditionalCategory;
  }

  private deleteDocument( documentId: string){
    let param:HttpParams = new HttpParams().set( 'id', documentId).set( 'caseTypeId', this._caseType.getId()+'');
    this._http.delete( this._urlService.deleteCaseTypeDocument, {headers: this._urlService.headerTextPlain, params: param})
      .subscribe( newCaseType => this.afterSubmit( newCaseType), err => this.afterError( err, documentId));
  }

  private checkAllConditionPassed(){
    let isFormValid = this._additionalFormGroup.valid;
    return !isFormValid || this._isProcessing;
  }

}
