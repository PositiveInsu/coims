import {Component, OnInit, Input} from "@angular/core";
import {CaseDocument, DocumentCategoryFactory} from "../../_model/case-document";
import {FormGroup, FormBuilder, AbstractControl, FormControl, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {RestfulUrlService} from "../../_service/restful-url.service";
import {ErrorService} from "../../_service/error.service";
import {CaseType} from "../../_model/case-type";
import {HttpParams} from "@angular/common/http";
import {SignupValidator} from "../../_validator/signup.validator";
/**
 * Created by Joinsu on 2018-09-28.
 */
@Component({
  selector:'coims-manage-documents-list-content-modal',
  templateUrl: './manage-documents-list-content-modal.component.html',
  providers: []
})
export class ManageDocumentsListContentModalComponent implements OnInit {
  private _docCategory: {[key:string]: Array<CaseDocument>};
  private _defaultDocCategory: {[key:string]: Array<CaseDocument>};
  private _caseType: CaseType;

  private _categoryKeyList: Array<string>;
  private _addDocumentForm: FormGroup;
  private _modifyDocumentForm: FormGroup;
  private _docList: Array<CaseDocument>;
  private _defauiltDocList: Array<CaseDocument>;

  private _category: AbstractControl;
  private _docName: AbstractControl;
  private _docCode: AbstractControl;
  private _isAdding: boolean;

  @Input()
  set caseType( caseType: CaseType) {
    this._caseType = caseType;
  }

  constructor( private _fb: FormBuilder,
               private _http: HttpClient,
               private _urlService: RestfulUrlService,
               private _errService: ErrorService,
               private _categoryFactory: DocumentCategoryFactory
  ){}

  ngOnInit(): void {
    this.initVariables();
    this.initForm();
  }

  private initVariables() {
    this._defaultDocCategory = this._categoryFactory.getCategoryObj();
    this._defauiltDocList = new Array<CaseDocument>();
    this._categoryKeyList = this._categoryFactory.categoryKeyList;
    this._isAdding = false;
    this.setDocumentList( this._caseType);
    this.setCaseDocumentList();
    this.getDocumentList();
  }

  private initForm() {
    this.initAddDocumentForm();
    this.initModifyDocumentForm();
  }

  private setDocumentList( caseType: CaseType) {
    this._docCategory = this._categoryFactory.getCategoryObj();
    this._docList = caseType.getDocumentList();
    this._categoryKeyList = Object.keys( this._docCategory);
    for( let caseTypeDocument of this._docList){
      this._docCategory[ caseTypeDocument.getCategory()].push( caseTypeDocument);
    }
  }

  private initAddDocumentForm() {
    this._category = new FormControl( '', Validators.required);
    this._docName = new FormControl( '', Validators.required);
    this._docCode = new FormControl( '', { updateOn:'blur', validators: Validators.compose([ Validators.required, Validators.maxLength(5), Validators.pattern( SignupValidator.uppercaseNameRegExp)])});
    this._addDocumentForm = this._fb.group({
      category: this._category,
      docName: this._docName,
      docCode: this._docCode
    });
  }

  private initModifyDocumentForm() {
    let modifyFormControlObj:Object = {};
    for( let caseDocument of this._defauiltDocList){
      modifyFormControlObj[ caseDocument.getId()] = new FormControl( caseDocument.getName(), Validators.required);
    }
    this._modifyDocumentForm = this._fb.group( modifyFormControlObj);
  }

  private getDocumentList() {
    this._http.get( this._urlService.findDefaultDocumentList, {headers: this._urlService.headerTextPlain})
      .subscribe( res => this.afterGetDefaultDocList( res), err => this.afterError( err, "Request get default document list."));
  }

  private checkAllConditionPassed(): boolean{
    return !this._addDocumentForm.valid || this._isAdding;
  }

  private addDocument(){
    if( this._isAdding){
      return false;
    }
    let caseDocument: CaseDocument = this.setInputDataToObj();
    this._http.put( this._urlService.addDocument, JSON.stringify( caseDocument), {headers: this._urlService.headerJson})
      .subscribe( res => this.afterGetDefaultDocList( res), err => this.afterError( err, caseDocument));
  }

  private deleteDocument( caseDocument: CaseDocument){
    this._http.delete( this._urlService.deleteDocReturnDocList, {headers: this._urlService.headerJson, params: new HttpParams().set( 'id', caseDocument.getId().toString())})
      .subscribe( res => this.afterGetDefaultDocList( res), err => this.afterError( err, caseDocument));
  }

  private changeModifyMode( caseDocument: CaseDocument){
    caseDocument["modify_mode"] = true;
  }

  private modifyDocName( caseDocument: CaseDocument){
    let formControl:AbstractControl = this._modifyDocumentForm.controls[ caseDocument.getId()];
    if( formControl.valid){
      caseDocument.setName( formControl.value);
      this._http.put( this._urlService.modifyDocument, JSON.stringify( caseDocument), {headers: this._urlService.headerJson})
        .subscribe( res => this.afterGetDefaultDocList( res), err => this.afterError( err, caseDocument));
      caseDocument["modify_mode"] = false;
    }else{
      return false;
    }
  }

  private checkHasError( formControlId: any): boolean {
    let formControl:AbstractControl = this._modifyDocumentForm.controls[ formControlId];
    return !formControl.valid;
  }

  private afterError( err: any, evidence: any) {
    this._errService.reportError( err, evidence);
    this.resetForm();
  }

  private afterGetDefaultDocList( res: any) {
    this.setNewData( res);
    this.initForm();
    this.resetForm();
  }

  private setNewData( res: any) {
    if( res) {
      this._defauiltDocList = this.getDocumentListFromResponse( res);
      this._defaultDocCategory = this._categoryFactory.getCategoryObj();
      this.setDocListToCategory( this._defaultDocCategory);
    }else{
      this._errService.reportErrorJustMessage( "Do not get document list!");
    }
  }

  private setDocListToCategory( targetCategory: {[key:string]: Array<CaseDocument>}) {
    for( let caseDocument of this._defauiltDocList){
      this._defaultDocCategory[ caseDocument.getCategory()].push( caseDocument);
    }
  }

  private getDocumentListFromResponse(res: any) {
    let documentList: Array<CaseDocument> = new Array<CaseDocument>();
    for( let caseDocument of res){
      let doc: CaseDocument = new CaseDocument();
      doc.setDataFromResponse( caseDocument);
      documentList.push( doc);
    }
    return documentList;
  }

  private setInputDataToObj(): CaseDocument {
    let caseDocument: CaseDocument = new CaseDocument();
    caseDocument.setCompanyId( -1);
    caseDocument.setName( this._docName.value);
    caseDocument.setCategory( this._category.value);
    caseDocument.setCode( this._docCode.value);
    return caseDocument;
  }

  private resetForm() {
    this._docName.reset();
  }

  private setCaseDocumentList() {
    this._caseType.getDocumentList();
  }

  private isNotAdditionalCategory( categoryName: string){
    return categoryName != this._categoryFactory.categoryTypeObj.ADDITIONAL;
  }

  private changeValueToUpperCase( formControlObj: FormControl){
    if( formControlObj.value){
      formControlObj.setValue( formControlObj.value.toUpperCase());
    }
  }
}
