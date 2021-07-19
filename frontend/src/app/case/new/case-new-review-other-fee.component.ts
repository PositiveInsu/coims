import {Component, OnInit, Input} from "@angular/core";
import {NewCaseDto} from "../../_model/case-dto";
import {OtherFee, CaseFee} from "../../_model/case-fee";
/**
 * Created by Joinsu on 2019-04-17.
 */
@Component({
  selector:'coims-case-new-review-other-fee',
  templateUrl: 'case-new-review-other-fee.component.html',
  providers: []
})
export class CaseNewReviewOtherFeeComponent implements OnInit{

  @Input() applicantCaseDto: NewCaseDto;
  @Input() index: number;
  private _otherFeeList: Array<OtherFee>;
  private _caseFee: CaseFee;

  constructor() {
  }

  ngOnInit(): void {
    this._caseFee = this.applicantCaseDto.getCaseFee();
    this._caseFee.initOtherFeeList();
    this.initOtherFeeList();
  }

  private getName(): string{
    return this.applicantCaseDto.getUser().getFName() + ' ' + this.applicantCaseDto.getUser().getLName();
  }

  private getCaseType(): string{
    return '(' + this.applicantCaseDto.getCaseType().getCode() + ')';
  }

  private initOtherFeeList(): void{
    this._otherFeeList = new Array<OtherFee>();
    for( let otherFee of this._caseFee.otherFeeList){
      if( otherFee.fee){
        this._otherFeeList.push( otherFee);
      }
    }
  }

  private isExistOtherFeeList(): boolean{
    if( this._otherFeeList.length > 0){
      return true;
    }
    return false;
  }
}
