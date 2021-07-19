import {CaseDetailContentComponent} from "./case-detail-content.component";
import {Input, Component, OnInit} from "@angular/core";
import {DetailCaseDto, NewCaseDto} from "../../../_model/case-dto";
import {CaseFee, OtherFee} from "../../../_model/case-fee";
import {HttpClient} from "@angular/common/http";
import {RestfulUrlService} from "../../../_service/restful-url.service";
import {ErrorService} from "../../../_service/error.service";
import {HttpErrorResponse} from "@angular/common/http";
import {DefaultDocumentCode} from "../../../_model/default-document-code";
import {CaseDocument} from "../../../_model/case-document";
import {CaseDetailService} from "../../../_service/case-detail.service";
/**
 * Created by Joinsu on 2019-05-02.
 */
@Component({
  selector:'coims-case-detail-contract',
  templateUrl: 'case-detail-contract.component.html',
  providers: []
})
export class CaseDetailContractComponent implements CaseDetailContentComponent, OnInit {
  @Input() _caseList: Array<DetailCaseDto>;

  private _totalConsultantFee: number;
  private _totalGovernmentFee: number;
  private _totalOtherFee: number;

  private _defaultDocCode: DefaultDocumentCode;
  private _agreementDoc: CaseDocument;

  private _newCaseDtoList: Array<NewCaseDto>;

  constructor( private _http: HttpClient,
               private _urlService: RestfulUrlService,
               private _errService: ErrorService,
               private _caseDetailService: CaseDetailService,
  ){}

  ngOnInit(): void {
    this.initValuables();
    this.initNewCaseDtoList();
    this.initTotalFee();
    this.initAgreementDocFile();
  }

  private initValuables(): void {
    this._defaultDocCode = new DefaultDocumentCode();
    this._agreementDoc = new CaseDocument();
  }

  private initNewCaseDtoList(): void {
    this._newCaseDtoList = new Array<NewCaseDto>();
    for (let clientCase of this._caseList) {
      let newCaseDto = new NewCaseDto();
      newCaseDto.setCaseFee(clientCase.caseFee);
      newCaseDto.setUser(clientCase.user);
      newCaseDto.setCaseType(clientCase.caseType);
      this._newCaseDtoList.push(newCaseDto);
    }
  }

  private initTotalFee() {
    let consultantFee: number = 0;
    let governmentFee: number = 0;
    let otherFee: number = 0;

    for (let clientCase of this._caseList) {
      consultantFee += clientCase.caseFee.getTotal();
      governmentFee += clientCase.caseFee.getGovernment();
      otherFee += this.getOtherFee(clientCase.caseFee);
    }
    this._totalConsultantFee = consultantFee;
    this._totalGovernmentFee = governmentFee;
    this._totalOtherFee = otherFee;
  }

  private getOtherFee(caseFee: CaseFee): number {
    let sumOtherFee: number = 0;
    caseFee.initOtherFeeList();
    let otherFeeList: Array<OtherFee> = caseFee.otherFeeList;
    for (let otherFee of otherFeeList) {
      if (otherFee.fee) {
        sumOtherFee += otherFee.fee;
      }
    }
    return sumOtherFee;
  }

  private isExistOtherFee(): boolean {
    if (this._totalOtherFee === 0) {
      return false;
    }
    return true;
  }

  private initAgreementDocFile() {
    this._http.post( this._urlService.findDocumentByDocCode, this._defaultDocCode.AGREEMENT, { headers: this._urlService.headerTextPlain})
      .subscribe( data => this.afterFindDoc( data), (err :HttpErrorResponse)=> this._errService.reportError( err, "[Doc Code] - " + this._defaultDocCode.AGREEMENT));
  }

  private afterFindDoc(responseData: Object) {
    if( responseData){
      let document: CaseDocument = new CaseDocument();
      document.setDataFromResponse( responseData);
      this._agreementDoc = document;
    }
  }

  public afterFileUpload( flag: boolean){
    this._caseDetailService.changeReadyStatus( flag);
  }
}
