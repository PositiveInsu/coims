import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CaseComponent} from "./case.component";
import {CaseRoutingModule} from "./case.routing.module";
import {CaseListComponent} from "./list/case-list.component";
import {CommonDataService} from "../_service/common-data.service";
import {PageNavigationComponent} from "../common/page-navigation.component";
import {CaseListCaseTypeModalComponent} from "./list/case-list-case-type-modal.component";
import {CaseListCaseStatusModalComponent} from "./list/case-list-case-status-modal.component";
/**
 * Created by Joinsu on 2018-12-14.
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CaseRoutingModule,
  ],
  declarations : [
    CaseComponent,
    CaseListComponent,
    CaseListCaseTypeModalComponent,
    CaseListCaseStatusModalComponent,
    PageNavigationComponent,

  ],
  exports: [ CaseComponent],
  providers: [
    CommonDataService,
  ]
})
export class CaseModule{}
