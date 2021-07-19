import {OnInit, Component, Input} from "@angular/core";
import {CaseStatus} from "../../_model/case-status";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {RestfulUrlService} from "../../_service/restful-url.service";
import {ErrorService} from "../../_service/error.service";
import {CommonService} from "../../_service/common.service";
/**
 * Created by Joinsu on 2019-05-01.
 */
@Component({
  selector:'coims-case-detail-status-modal',
  templateUrl: 'case-detail-status-modal.component.html',
  providers: []
})
export class CaseDetailStatusModalComponent implements OnInit{

  @Input() caseStatusList: Array<CaseStatus>;
  @Input() caseId: number;
  @Input() stepNo: number;

  private _passedDateList: Array<CaseStatusDto>;

  constructor( private _http: HttpClient,
               private _urlService: RestfulUrlService,
               private _errService: ErrorService,
               private _commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.initValuables();
    this.initStatusData();
  }

  private initValuables() {
    this._passedDateList = new Array<CaseStatusDto>();
  }

  private checkActive( caseStatus: CaseStatus){
    if( caseStatus.getStepNo() <= this.stepNo){
      return true;
    }
    return false;
  }

  private checkOn( caseStatus: CaseStatus){
    if( caseStatus.getStepNo() == this.stepNo){
      return true;
    }
    return false;
  }

  private afterFind( responseData: any) {
    if( responseData){
      for( let data of responseData){
        let caseStatusDto: CaseStatusDto = new CaseStatusDto( data.caseStatus.id,  new Date( data.passedDate));
        this._passedDateList.push( caseStatusDto);
      }
    }
  }

  private initStatusData() {
    this._http.post( this._urlService.findAllClientCaseStatusById, this.caseId+"", { headers: this._urlService.headerTextPlain})
      .subscribe( data => this.afterFind( data), (err :HttpErrorResponse)=> this._errService.reportError( err, "[Case Id] - " + this.caseId));
  }

  public getPassedDate( caseStatusId: number): string{
    let dateString: string = "";
    for( let caseStatusDto of this._passedDateList){
      if( caseStatusDto.caseStatusId === caseStatusId){
        dateString = this._commonService.getStringDateFromDate( caseStatusDto.passedDate);
      }
    }
    return dateString;
  }
}

export class CaseStatusDto{
  private _caseStatusId: number;
  private _passedDate: Date;

  constructor(caseStatusId: number, passedDate: Date) {
    this._caseStatusId = caseStatusId;
    this._passedDate = passedDate;
  }

  get caseStatusId(): number {
    return this._caseStatusId;
  }

  set caseStatusId(value: number) {
    this._caseStatusId = value;
  }

  get passedDate(): Date {
    return this._passedDate;
  }

  set passedDate(value: Date) {
    this._passedDate = value;
  }
}
