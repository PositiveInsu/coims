import {OnInit, Component, OnDestroy} from "@angular/core";
import {CaseDtoContainer, CaseNewService} from "../../_service/case-new.service";
import {Router} from "@angular/router";
import {NewCaseDto} from "../../_model/case-dto";
import {CaseFee, OtherFee} from "../../_model/case-fee";
import {HttpClient} from "@angular/common/http";
import {RestfulUrlService} from "../../_service/restful-url.service";
import {CommonService} from "../../_service/common.service";
import {ErrorService} from "../../_service/error.service";
import {HttpErrorResponse} from "@angular/common/http";
/**
 * Created by Joinsu on 2019-04-12.
 */
@Component({
  selector:'coims-case-new-review',
  templateUrl: 'case-new-review.component.html',
  providers: []
})
export class CaseNewReviewComponent implements OnInit, OnDestroy{

  private _caseDtoContainerList: Array<CaseDtoContainer>;
  private _isNullCaseDto: boolean;
  private _mainApplicant: NewCaseDto;
  private _totalConsultantFee: number;
  private _totalGovernmentFee: number;
  private _totalOtherFee: number;
  private _isPushNextPreviousStep: boolean;
  private _ingSubmitProcess: boolean;

  constructor( private _commonService: CommonService,
               private _caseNewService: CaseNewService,
               private _errService: ErrorService,
               private _router: Router,
               private _http: HttpClient,
               private _urlService: RestfulUrlService,
  ){}

  ngOnInit(): void {
    this.checkExistCaseDto();
    this.initValuables();
    this.initTotalFee();
  }

  private checkExistCaseDto(): void{
    this._isNullCaseDto = this._caseNewService.isNullCaseDtoContainerList();
    if( this._isNullCaseDto){
      this._caseNewService.moveToStep(this._router, 1);
    };
  }

  private initValuables(): void{
    this._caseDtoContainerList = this._isNullCaseDto ? this._caseNewService.initCaseDtoContainerList() : this._caseNewService.caseDtoContainerList;
    this._mainApplicant = this._caseDtoContainerList[ this._caseNewService.MAIN_CASE_NUMBER].caseDto;
    this._totalConsultantFee = 0;
    this._totalGovernmentFee = 0;
    this._totalOtherFee = 0;
    this._isPushNextPreviousStep = false;
    this._ingSubmitProcess = false;
  }

  private getApplicantHeader(): string{
    return this._caseNewService.getApplicantHeader( this._mainApplicant);
  }

  private initTotalFee(): void{
    let consultantFee: number = 0;
    let governmentFee: number = 0;
    let otherFee: number = 0;
    for( let caseDtoContainer of this._caseDtoContainerList){
      consultantFee += caseDtoContainer.caseDto.getCaseFee().getTotal();
      governmentFee += caseDtoContainer.caseDto.getCaseFee().getGovernment();
      otherFee += this.getOtherFee( caseDtoContainer.caseDto.getCaseFee());
    }
    this._totalConsultantFee = consultantFee;
    this._totalGovernmentFee = governmentFee;
    this._totalOtherFee = otherFee;
  }

  private getOtherFee(caseFee: CaseFee): number{
    let sumOtherFee: number = 0;
    caseFee.initOtherFeeList();
    let otherFeeList: Array<OtherFee> = caseFee.otherFeeList;
    for( let otherFee of otherFeeList){
      if( otherFee.fee){
        sumOtherFee += otherFee.fee;
      }
    }
    return sumOtherFee;
  }

  private isExistOtherFee(): boolean{
    if( this._totalOtherFee === 0){
      return false;
    }
    return true;
  }

  private previousStep(): void{
    this._isPushNextPreviousStep = true;
    this._caseNewService.previousStep(this._router);
  }

  private submit(): void{
    this._ingSubmitProcess = true;
    let caseDtoList: Array<NewCaseDto> = this.getCaseDtoList();
    this._http.put( this._urlService.addClientCase, JSON.stringify( caseDtoList), { headers: this._urlService.headerJson})
      .subscribe( data => { this.afterSubmit( data)}, err => { this.afterError( err, 'Insert Error.')});
  }

  private getCaseDtoList(): Array<NewCaseDto>{
    let caseDtoList: Array<NewCaseDto> = new Array<NewCaseDto>();
    for( let caseDtoContainer of this._caseDtoContainerList){
      caseDtoContainer.caseDto.setCompanyId( this._commonService.user.getCompany().getId());
      caseDtoList.push( caseDtoContainer.caseDto);
    }
    return caseDtoList;
  }

  private afterSubmit( data: any) {
    if( data.caseNo){
      this._isPushNextPreviousStep = true;
      this._caseNewService.caseDtoContainerList[ this._caseNewService.MAIN_CASE_NUMBER].caseDto.setCaseNo( data.caseNo);
      this._caseNewService.nextStep( this._router);
    }else{
      this._errService.reportErrorJustMessage( "Ther is no caseNo!");
    }
  }

  private afterError(err: HttpErrorResponse, evidence: string): void {
    this._errService.reportError( err, evidence);
  }

  ngOnDestroy(): void {
    if( !this._isPushNextPreviousStep){
      this._caseNewService.destroyCaseDtoContainerList();
    }
  }
}
