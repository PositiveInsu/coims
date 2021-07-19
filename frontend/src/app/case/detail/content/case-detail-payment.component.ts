import {Input, Component, OnInit} from "@angular/core";
import {CaseDetailContentComponent} from "./case-detail-content.component";
import {DetailCaseDto, NewCaseDto} from "../../../_model/case-dto";
import {CaseFee, OtherFee} from "../../../_model/case-fee";
import {CaseDetailService} from "../../../_service/case-detail.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {RestfulUrlService} from "../../../_service/restful-url.service";
import {CommonService} from "../../../_service/common.service";
import {ErrorService} from "../../../_service/error.service";
import {CaseDocument} from "../../../_model/case-document";
import {DefaultDocumentCode} from "../../../_model/default-document-code";
/**
 * Created by Joinsu on 2019-05-10.
 */
@Component({
  selector:'coims-case-detail-payment',
  templateUrl: 'case-detail-payment.component.html',
  providers: []
})
export class CaseDetailPaymentComponent implements CaseDetailContentComponent, OnInit{
  @Input() _caseList: Array<DetailCaseDto>;

  private _totalConsultantFee: number;
  private _totalGovernmentFee: number;
  private _totalOtherFee: number;

  private _caseNo: string;
  private _companyId: number;
  private _userName: string;

  private _defaultDocCode: DefaultDocumentCode;
  private _companyReceiptDoc: CaseDocument;

  private _newCaseDtoList: Array<NewCaseDto>;

  constructor( private _commonService: CommonService,
               private _errService: ErrorService,
               private _caseDetailService: CaseDetailService,
               private _http: HttpClient,
               private _urlService: RestfulUrlService
  ){}

  ngOnInit(): void {
    this.initValuables();
    this.initNewCaseDtoList();
    this.initTotalFee();
    this.initCompanyReceiptDocFile();
  }

  private initValuables() {
    this._caseNo = this._caseList[0].caseNo;
    this._companyId = this._commonService.user.getCompany().getId();
    this._userName = this._caseList[0].user.getFName();
    this._defaultDocCode = new DefaultDocumentCode();
    this._companyReceiptDoc = new CaseDocument();
  }

  private initNewCaseDtoList(): void {
    this._newCaseDtoList = new Array<NewCaseDto>();
    for (let clientCase of this._caseList) {
      let newCaseDto = new NewCaseDto();
      newCaseDto.setCaseFee( clientCase.caseFee);
      newCaseDto.setUser( clientCase.user);
      newCaseDto.setCaseType( clientCase.caseType);
      this._newCaseDtoList.push( newCaseDto);
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

  public afterFileUpload( flag: boolean){
    this._caseDetailService.changeReadyStatus( flag);
  }

  private downInvoice(){
    let fileName: string = 'Invoice-' + this._caseNo + "-" + this._userName + '.xlsx';
    let param: Object = {
      'caseNo': this._caseNo,
      'companyId': this._companyId.toString()
    };
    this._http.post( this._urlService.downCaseInvoice, JSON.stringify( param), { headers: this._urlService.headerJson, responseType: 'blob'})
      .subscribe( data => this.afterDownload( data, fileName), ( err : HttpErrorResponse)=> this._errService.reportError( err, JSON.stringify( param)));
  }

  private downReceipt(){
    let fileName: string = 'Receipt-' + this._caseNo + "-" + this._userName + '.xlsx';
    let param: Object = {
      'caseNo': this._caseNo,
      'companyId': this._companyId.toString()
    };
    this._http.post( this._urlService.downCaseReceipt, JSON.stringify( param), { headers: this._urlService.headerJson, responseType: 'blob'})
      .subscribe( data => this.afterDownload( data, fileName), ( err : HttpErrorResponse)=> this._errService.reportError( err, JSON.stringify( param)));
  }

  private afterDownload( obj: any, fileName: string) {
    var url = window.URL.createObjectURL( obj);
    var a = document.createElement( 'a');
    document.body.appendChild( a);
    a.setAttribute( 'style', 'display: none');
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL( url);
    a.remove();
  }

  private initCompanyReceiptDocFile() {
    this._http.post( this._urlService.findDocumentByDocCode, this._defaultDocCode.COMPANY_RECEIPT, { headers: this._urlService.headerTextPlain})
      .subscribe( data => this.afterFindDoc( data), (err :HttpErrorResponse)=> this._errService.reportError( err, "[Doc Code] - " + this._defaultDocCode.COMPANY_RECEIPT));
  }

  private afterFindDoc(responseData: Object) {
    if( responseData){
      let document: CaseDocument = new CaseDocument();
      document.setDataFromResponse( responseData);
      this._companyReceiptDoc = document;
    }
  }
}








