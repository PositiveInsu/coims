import {OnInit, Component, ViewChild, ComponentFactoryResolver, ComponentRef} from "@angular/core";
import {MainService} from "../../_service/main.service";
import {CommonService} from "../../_service/common.service";
import {MainComponent} from "../../main/main.component";
import {ActivatedRoute} from "@angular/router";
import {CaseDetailContentDirective} from "../../_directive/case-detail-content.directive";
import {RestfulUrlService} from "../../_service/restful-url.service";
import {HttpClient} from "@angular/common/http";
import {ErrorService} from "../../_service/error.service";
import {DetailCaseDto} from "../../_model/case-dto";
import {CaseStatus} from "../../_model/case-status";
import {CaseDetailService} from "../../_service/case-detail.service";
import {CaseDetailContentComponent} from "./content/case-detail-content.component";
import {CaseStatusType} from "../../_model/case-status-type";
import {CaseDetailContractComponent} from "./content/case-detail-contract.component";
import {HttpErrorResponse} from "@angular/common/http";
import {CaseDetailPaymentComponent} from "./content/case-detail-payment.component";
import {CaseDetailPortalComponent} from "./content/case-detail-portal.component";
/**
 * Created by Joinsu on 2019-05-01.
 */
@Component({
  selector:'coims-case-detail',
  templateUrl: 'case-detail.component.html',
  providers: []
})
export class CaseDetailComponent implements OnInit{

  @ViewChild( CaseDetailContentDirective) caseDetailContentDirective;

  private _caseList: Array<DetailCaseDto>;
  private _caseStatusList: Array<CaseStatus>;
  private _statusComponentList: Array<any>;
  private _caseStatusType: CaseStatusType = new CaseStatusType();
  private _currentCaseStatus: string;
  private _isReadyStatusChange: boolean;
  private _isInitComplete: boolean;
  private _companyId: number;
  private _stepNo: number;
  private _currentDetailComponent: ComponentRef<CaseDetailContentComponent>;

  constructor( private _commonService: CommonService,
               private _mainService: MainService,
               private _errService: ErrorService,
               private _caseDetailService: CaseDetailService,
               private _parent: MainComponent,
               private _route: ActivatedRoute,
               private _componentFactoryResolver: ComponentFactoryResolver,
               private _http: HttpClient,
               private _urlService: RestfulUrlService
  ){}

  ngOnInit(): void {
    this._mainService.changeMenu( this._mainService.leftMenuFactory.CASE_DETAIL);
    this.initValueables();
    this.initSubscribes();
    this._parent.detectChanges();
  }

  private initSubscribes() {
    this._route.params.subscribe( params => this.setClientCaseList( params.caseNo));
    this._caseDetailService.isReadyStatusChange.subscribe( obj => { this._isReadyStatusChange = obj});
  }

  private initValueables() {
    this._caseList = new Array<DetailCaseDto>();
    this._caseStatusList = new Array<CaseStatus>();
    this._currentCaseStatus = "";
    this._companyId = this._commonService.user.getCompany().getId();
    this._isInitComplete = false;
  }

  private setClientCaseList( caseNo: string) {
    let param: Object = {
      'caseNo': caseNo,
      'companyId': this._companyId
    };
    this._http.post( this._urlService.findCaseListByCaseNo, JSON.stringify( param), {headers: this._urlService.headerJson})
      .subscribe( res => { this.setData( res)}, err => { this.afterError( err, "[CaseNo] - " + caseNo)});
  }

  private setData( res: any) {
    for( let response of res){
      let detailCase: DetailCaseDto = new DetailCaseDto();
      detailCase.setDataFromResponse( response);
      this._caseList.push( detailCase);
    }
    if( this._caseList.length > 0){
      this._currentCaseStatus = this._caseList[0].caseStatus.getName();
      this._stepNo = this._caseList[0].caseStatus.getStepNo();
      this.setCaseStatusList();
      this.setStatusComponentList( this._caseList[0].caseStatus.getCaseStatusType());
      this.setDetailContent();
      this._isInitComplete = true;
    }
  }

  private setCaseStatusList() {
    let statusType = this._caseList[0].caseStatus.getCaseStatusType();
    this._http.post( this._urlService.findAllCaseStatusByType, statusType, { headers: this._urlService.headerTextPlain})
      .subscribe( res => { this.setStatusListData( res)}, err => { this.afterError( err, "[CaseStatus Type] - " + statusType)});
  }

  private setStatusComponentList( statusType: string) {
    this._statusComponentList = this.getStatusComponentList( statusType);
  }

  private getStatusComponentList( statusType: string): Array<any>{
    this._statusComponentList = new Array<any>();
    if( statusType === this._caseStatusType.COMMON){
      this._statusComponentList.push( CaseDetailContractComponent);
      this._statusComponentList.push( CaseDetailPaymentComponent);
      this._statusComponentList.push( CaseDetailPortalComponent);
    }
    return this._statusComponentList;
  };

  private afterError( err: any, evidence: string) {
    this._errService.reportError( err, evidence);
  }

  private setStatusListData(res: any) {
    for( let response of res){
      let caseStatus: CaseStatus = new CaseStatus();
      caseStatus.setDataFromResponse( response);
      this._caseStatusList.push( caseStatus);
    }
  }

  private checkActive( caseStatus: CaseStatus){
    if( caseStatus.getStepNo() <= this._stepNo){
      return true;
    }
    return false;
  }

  private checkOn( caseStatus: CaseStatus){
    if( caseStatus.getStepNo() == this._stepNo){
      return true;
    }
    return false;
  }

  private setDetailContent(): void{
    this.addDetailContent( this._statusComponentList[ this._caseList[0].caseStatus.getStepNo()]);
  }

  private addDetailContent( component: any): void{
    let dependentComponent = this._componentFactoryResolver.resolveComponentFactory( component);
    let viewContainerRef = this.caseDetailContentDirective.viewContainerRef;
    let dependentComponentRef: ComponentRef<CaseDetailContentComponent> = viewContainerRef.createComponent( dependentComponent);
    dependentComponentRef.instance._caseList = this._caseList;
    this._currentDetailComponent = dependentComponentRef;
  }

  private nextStep(){
    let caseNo = this._caseList[0].caseNo;
    let param: Object = {
      'caseNo': caseNo,
      'companyId': this._companyId
    };
    this._http.post( this._urlService.changeNextCaseStatus, JSON.stringify( param), {headers: this._urlService.headerJson})
      .subscribe( res => this.afterChangeStatus( res), ( err: HttpErrorResponse) => this.afterError( err, "[Case ID] - " + caseNo + ", [Company ID] - " + this._companyId));
  }

  private afterChangeStatus( res: any) {
    if( res){
      this._currentDetailComponent.hostView.destroy();
      this._caseDetailService.changeReadyStatus( false);
      this.ngOnInit();
    }
  }
}






