import {OnInit, Component, Input} from "@angular/core";
import {NewCaseDto} from "../../_model/case-dto";
@Component({
  selector:'coims-case-new-review-gov-fee',
  templateUrl: 'case-new-review-gov-fee.component.html',
  providers: []
})
export class CaseNewReviewGovFeeComponent implements OnInit {

  @Input() applicantCaseDto: NewCaseDto;
  @Input() index: number;

  constructor() {
  }

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

  private getGovFee(): string{
    return this.addDollarMark( this.applicantCaseDto.getCaseFee().getGovernment());
  }

  private addDollarMark( fee: number): string{
    return "$" + fee;
  }
}
