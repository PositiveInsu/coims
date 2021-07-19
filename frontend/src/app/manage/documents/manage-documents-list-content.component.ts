import {Component, OnInit, Input} from "@angular/core";
import {CaseType} from "../../_model/case-type";
import {CaseDocument} from "../../_model/case-document";
import {RestfulUrlService} from "../../_service/restful-url.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {CommonService} from "../../_service/common.service";
/**
 * Created by Joinsu on 2018-09-27.
 */
@Component({
  selector:'coims-manage-documents-list-content',
  templateUrl: './manage-documents-list-content.component.html',
  providers: []
})
export class ManageDocumentsListContentComponent implements OnInit{

  private _isContentOpen: boolean;
  private _currentTabName: string;

  private _currentCaseType: CaseType;
  private _caseType: CaseType;

  constructor( private _commonService: CommonService,
               private _http: HttpClient,
               private _urlService: RestfulUrlService
  ){}

  @Input()
  set caseType( caseType: CaseType) {
    this._caseType = caseType;
    if( this._caseType){
      this._isContentOpen = true;
    }else{
      this._isContentOpen = false;
    }
    this._currentTabName = null;
  }

  ngOnInit(): void {
    this.initVariables();
  }

  private initVariables() {
    this._isContentOpen = false;
  }

  private selectTab( caseType: CaseType){
    this._currentCaseType = caseType;
    this._currentTabName = caseType.getName();
  }

  private isActive( caseTypeName: string, index: number){
    if( this._currentTabName){
      return this._currentTabName === caseTypeName;
    }else{
      return index === 0;
    }
  }

  private checkDocumentList( documentList: Array<CaseDocument>){
    if( documentList.length > 0){
      return true;
    }else{
      return false;
    }
  }

  private downloadDocumentCheckList( caseType: CaseType){
    let params: HttpParams = new HttpParams().set( "id", this._commonService.user.getCompany().getId().toString()).set( "caseTypeId", caseType.getId().toString());
    this._http.get( this._urlService.caseTypeDocumentListExcel, { headers: this._urlService.headerStream, params: params, responseType: 'blob' })
      .subscribe( obj => this.afterDownload( obj), err => console.log(err));
  }

  private afterDownload( obj: Blob) {
    var url = window.URL.createObjectURL( obj);
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = url;
    a.download =  this._caseType.getCode() + '-DocumentList-' + this._commonService.user.getCompany().getName() + '.xlsx';
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove(); // remove the element
  }
}
