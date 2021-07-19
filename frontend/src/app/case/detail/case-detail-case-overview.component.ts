import {Component, OnInit, Input} from "@angular/core";
import {DetailCaseDto} from "../../_model/case-dto";
import {User} from "../../_model/user";
import {CommonService} from "../../_service/common.service";
declare var $ :any;
/**
 * Created by Joinsu on 2019-05-16.
 */
@Component({
  selector:'coims-case-detail-case-overview',
  templateUrl: 'case-detail-case-overview.component.html',
  providers: []
})
export class CaseDetailCaseOverviewComponent implements OnInit{

  @Input() case: DetailCaseDto;
  @Input() no: number;

  private _isModifyMode: boolean;
  private _isMainApplicant: boolean;

  constructor( private _commonService: CommonService
  ) {}

  ngOnInit(): void {
    this._isModifyMode = false;
    this._isMainApplicant = (this.no === 0);
  }

  private getUserName( user: User): string{
    return user.getFName() + " " + user.getLName();
  }

  private getDateString( date: Date): string{
    if( date){
      return this._commonService.getStringDateFromDate( date);
    }
    return "-";
  }

  private getValueFromData( data: any): string{
    if( data){
      return data;
    }
    return "-";
  }

  private getModalId(): string{
    return "#personal_modal" + this.no;
  }

  private openPersonalInfoModal(): void{
    $('#personal_modal_' + this.no).modal('show');
  }
}
