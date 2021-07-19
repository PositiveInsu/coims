import {OnInit, Component, Input} from "@angular/core";
import {NewCaseDto} from "../../_model/case-dto";
import {CaseNewService} from "../../_service/case-new.service";
/**
 * Created by Joinsu on 2019-04-15.
 */
@Component({
  selector:'coims-case-new-review-personal-doc',
  templateUrl: 'case-new-review-personal-doc.component.html',
  providers: []
})
export class CaseNewReviewPersonalDocComponent implements OnInit {

  @Input() applicantCaseDto: NewCaseDto;
  @Input() index: number;

  constructor( private _caseNewService: CaseNewService,
  ) {}

  ngOnInit(): void {
  }

  private getApplicantHeader(): string{
    if( this.applicantCaseDto.getCaseType()){
      return this._caseNewService.getApplicantHeader( this.applicantCaseDto);
    }
    return "";
  }

  private isMainApplicant(): boolean{
    return this.index === 0;
  }
}





