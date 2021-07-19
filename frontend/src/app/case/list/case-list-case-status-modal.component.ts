import {OnInit, Component, Output, EventEmitter} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RestfulUrlService} from "../../_service/restful-url.service";
import {FormBuilder, FormGroup, AbstractControl, FormControl} from "@angular/forms";
import {ErrorService} from "../../_service/error.service";
import {CaseStatus, CaseStatusCategory} from "../../_model/case-status";
import {CaseStatusType} from "../../_model/case-status-type";
declare var $ :any;
/**
 * Created by Joinsu on 2019-04-30.
 */
@Component({
  selector:'coims-case-list-case-status-modal',
  templateUrl: './case-list-case-status-modal.component.html',
  providers: []
})
export class CaseListCaseStatusModalComponent implements OnInit {

  @Output() selectedCaseStatus = new EventEmitter<CaseStatus>();

  private _caseStatusCategory: CaseStatusCategory;
  private _caseStatusKeyList: Array<string>;
  private _targetStatusList: Array<CaseStatus>;
  private _currentCaseStatus: CaseStatus;
  private _isOpenMessage: boolean;

  private _caseStatusForm: FormGroup;
  private _category: AbstractControl;
  private _status: AbstractControl;

  constructor( private _http: HttpClient,
               private _urlService: RestfulUrlService,
               private _fb: FormBuilder,
               private _errService: ErrorService
  ){}

  ngOnInit(): void {
    this.initValuables();
    this.initForm();
    this.initCaseStatus();
  }

  private initValuables(): void{
    this._caseStatusCategory = new CaseStatusCategory();
    this._caseStatusKeyList = new CaseStatusType().getCaseStatusTypeList();
    this._isOpenMessage = false;
  }

  private initForm(): void{
    this._category = new FormControl( '');
    this._status = new FormControl( '');

    this._caseStatusForm = this._fb.group({
      category: this._category,
      status: this._status
    });
  }

  private initCaseStatus(): void{
    this._http.get( this._urlService.findAllCaseStatus, { headers: this._urlService.headerJson})
      .subscribe( res => { this.setData( res)}, err => { this.afterError( err, "Find all case status.")});
  }

  private setData( res: any): void{
    let caseStatusList: Array<CaseStatus> = new Array<CaseStatus>();
    for( let data of res){
      let caseStatus: CaseStatus = new CaseStatus();
      caseStatus.setDataFromResponse( data);
      caseStatusList.push( caseStatus);
    }
    this.setCaseStatusObj( caseStatusList);
  }

  private afterError( err: any, evidence: string): void{
    this._errService.reportError( err, evidence);
  }

  private setCaseStatusObj( caseStatusList: Array<CaseStatus>): void{
    for( let caseStatus of caseStatusList){
      this._caseStatusCategory[ caseStatus.getCaseStatusType()].push( caseStatus);
    }
  }

  private selectCaseCategory( category: string): void{
    if( this._caseStatusCategory[ category] && this._caseStatusCategory[ category].length > 0){
      this._targetStatusList = this._caseStatusCategory[ category];
    }else{
      this._targetStatusList = null;
    }
  }

  private selectStatus( index: number): void{
    this._currentCaseStatus = this._targetStatusList[ index];
  }

  private complete(): void{
    if( this._currentCaseStatus){
      this.selectedCaseStatus.emit( this._currentCaseStatus);
      this.clearData();
      $('#case-list-case-status-modal').modal('hide');
    }else{
      this._isOpenMessage = true;
    }
  }

  private cancel(): void{
    this.selectedCaseStatus.emit( null);
    this.clearData();
    $('#case-list-case-status-modal').modal('hide');
  }

  private clearData() {
    this._category.setValue( "");
    this._status.setValue( "");
    this._currentCaseStatus = null;
    this._targetStatusList = null;
    this._isOpenMessage = false;
  }
}









