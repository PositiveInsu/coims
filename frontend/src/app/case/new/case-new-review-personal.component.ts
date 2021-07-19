import {OnInit, Component, Input} from "@angular/core";
import {NewCaseDto} from "../../_model/case-dto";
import {User} from "../../_model/user";
import {CommonService} from "../../_service/common.service";
/**
 * Created by Joinsu on 2019-04-12.
 */
@Component({
  selector:'coims-case-new-review-personal',
  templateUrl: 'case-new-review-personal.component.html',
  providers: []
})
export class CaseNewReviewPersonalComponent implements OnInit {

  @Input() caseDto: NewCaseDto;

  private _applicant: User;
  private _caseType: string;
  private _caseTypeCode: string;
  private _birthDate: string;

  constructor(private _commonService: CommonService,
  ){}

  ngOnInit(): void {
    this._applicant = this.caseDto.getUser();
    if( this.caseDto.getCaseType()){
      this._caseType = this.caseDto.getCaseType().getName();
      this._caseTypeCode = this.caseDto.getCaseType().getCode();
      this._birthDate = this._commonService.getStringDateFromDate( this._applicant.getBirthDate());
    }
  }
}
