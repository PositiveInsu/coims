import {Component, OnInit, Input} from "@angular/core";
import {CaseDetailContentComponent} from "./case-detail-content.component";
import {DetailCaseDto} from "../../../_model/case-dto";
import {User} from "../../../_model/user";
/**
 * Created by Joinsu on 2019-05-15.
 */
@Component({
  selector:'coims-case-detail-portal',
  templateUrl: 'case-detail-portal.component.html',
  providers: []
})
export class CaseDetailPortalComponent implements CaseDetailContentComponent, OnInit{
  @Input() _caseList: Array<DetailCaseDto>;

  constructor() {
  }

  ngOnInit(): void {
  }
}
