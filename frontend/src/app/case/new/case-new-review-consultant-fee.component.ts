import {Component, OnInit, Input} from "@angular/core";
import {NewCaseDto} from "../../_model/case-dto";
/**
 * Created by Joinsu on 2019-04-16.
 */
@Component({
  selector:'coims-case-new-review-consultant-fee',
  templateUrl: 'case-new-review-consultant-fee.component.html',
  providers: []
})
export class CaseNewReviewConsultantFeeComponent implements OnInit{

  @Input() applicantCaseDto: NewCaseDto;
  @Input() index: number;

  constructor(){}

  ngOnInit(): void {
  }

  private getName(): string{
    return this.applicantCaseDto.getUser().getFName() + ' ' + this.applicantCaseDto.getUser().getLName();
  }

  private getCaseType(): string{
    if( this.applicantCaseDto.getCaseType()){
      return '(' + this.applicantCaseDto.getCaseType().getCode() + ')';
    }
    return "";
  }

  private isMainApplicant(): boolean{
    return this.index === 0;
  }

  private getChangeType(): string{
    if( this.applicantCaseDto.getCaseFee().getDiscount()){
      return "Discount";
    }
    if( this.applicantCaseDto.getCaseFee().getExtra()){
      return "Extra";
    }
  }

  private getChangeFee(): string{
    if( this.applicantCaseDto.getCaseFee().getDiscount()){
      return this.addDollarMark( this.applicantCaseDto.getCaseFee().getDiscount());
    }
    if( this.applicantCaseDto.getCaseFee().getExtra()){
      return this.addDollarMark( this.applicantCaseDto.getCaseFee().getExtra());
    }
    return this.addDollarMark( 0);
  }

  private getSubTotal(): string{
    return this.addDollarMark( this.applicantCaseDto.getCaseFee().getSubTotal());
  }

  private getBasicFee(): string{
    return this.addDollarMark( this.applicantCaseDto.getCaseFee().getBasic());
  }

  private addDollarMark( fee: number): string{
    return "$" + fee;
  }

  private getTotal(): string{
    return this.addDollarMark( this.applicantCaseDto.getCaseFee().getSubTotal() + this.applicantCaseDto.getCaseFee().getTax());
  }

  private getTax(): string{
    return this.addDollarMark( this.applicantCaseDto.getCaseFee().getTax());
  }

  private getTaxPercentage(): string{
    return this.applicantCaseDto.getCaseFee().getTaxPercentage() + "%";
  }
}
