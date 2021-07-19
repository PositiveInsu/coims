import {OnInit, Component, Input} from "@angular/core";
import {NewCaseDto} from "../../_model/case-dto";
import {CaseDocument} from "../../_model/case-document";
import {CaseDocumentType} from "../../_model/case-document-type";
/**
 * Created by Joinsu on 2019-04-12.
 */
@Component({
  selector:'coims-case-new-review-qnd',
  templateUrl: 'case-new-review-qnd.component.html',
  providers: []
})
export class CaseNewReviewQnDComponent implements OnInit {

  @Input() caseDto: NewCaseDto;
  private _caseTypeDefaultDocList: Array<CaseDocument>;
  private _defaultDocList: Array<CaseDocument>;
  private _additionalDocList: Array<CaseDocument>;
  private _moreDocList: Array<CaseDocument>;
  private _applicantDocList: Array<CaseDocument>;
  private _categoryTypeObj: CaseDocumentType;
  private _exceptDocIdList: Array<number>;

  constructor(
  ){}

  ngOnInit(): void {
    this._caseTypeDefaultDocList = this.caseDto.getCaseType() ? this.caseDto.getCaseType().getDocumentList() : new Array<CaseDocument>();
    this._applicantDocList = this.caseDto.getDocumentList() ? this.caseDto.getDocumentList(): new Array<CaseDocument>();
    this._categoryTypeObj = new CaseDocumentType();
    this._defaultDocList = new Array<CaseDocument>();
    this._additionalDocList = new Array<CaseDocument>();
    this._moreDocList = new Array<CaseDocument>();
    this._exceptDocIdList = new Array<number>();
    this.setDocList();
  }

  private setDocList(): void{
    for( let caseDocument of this._caseTypeDefaultDocList){
      this.setDefaultDocList( caseDocument);
      this.setAdditionalDocList( caseDocument);
      this.setExceptDocList( caseDocument);
    }

    for( let caseDocument of this._applicantDocList){
      this.setMoreDocList( caseDocument);
    }
  }

  private setExceptDocList(caseDocument: CaseDocument){
    if( this.isExceptDocument( caseDocument)){
      this._exceptDocIdList.push( caseDocument.getId());
    }
  }

  private isExceptDocument( caseDocument: CaseDocument): boolean {
    for( let applicantDocument of this._applicantDocList){
      if( applicantDocument.getId() === caseDocument.getId()){
        return false;
      }
    }
    return true;
  }

  private setAdditionalDocList( caseDocument: CaseDocument) {
    if( this.isAdditionalDoc( caseDocument)){
      this._additionalDocList.push( caseDocument);
    }
  }

  private setDefaultDocList( caseDocument: CaseDocument) {
    if( !this.isAdditionalDoc( caseDocument) && !this.isApplicationDoc( caseDocument)){
      this._defaultDocList.push( caseDocument);
    }
  }

  private isAdditionalDoc( caseDocument: CaseDocument): boolean{
    return caseDocument.getCategory() === this._categoryTypeObj.ADDITIONAL;
  }

  private isApplicationDoc(caseDocument: CaseDocument): boolean {
    return caseDocument.getCategory() === this._categoryTypeObj.APPLICATION;
  }

  private setMoreDocList( caseDocument: CaseDocument) {
    if( this.isMoreDoc( caseDocument)){
      this._moreDocList.push( caseDocument);
    }
  }

  private isMoreDoc(caseDocument: CaseDocument): boolean{
    return caseDocument.getCategory() === this._categoryTypeObj.MORE;
  }

  private isExistDataOnList(list: Array<CaseDocument>): boolean{
    if( list.length > 0){
      return true;
    }
    return false;
  }

  private isExceptDocId( docId: number): boolean{
    for( let exceptDocId of this._exceptDocIdList){
      if( docId === exceptDocId){
        return true;
      }
    }
    return false;
  }

}
