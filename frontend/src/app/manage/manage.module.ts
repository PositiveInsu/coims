/**
 * Created by Joinsu on 2018-08-03.
 */
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ManageComponent} from "./manage.component";
import {ManageRoutingModule} from "./manage.routing.module";
import {ManageStaffComponent} from "./staff/manage-staff.component";
import {ManageStaffModalComponent} from "./staff/manage-staff-modal.component";
import {ManageCompanyComponent} from "./company/manage-company.component";
import {CommonDataService} from "../_service/common-data.service";
import {ManageFeeComponent} from "./fee/manage-fee.component";
import {ManageCaseTypeComponent} from "./casetype/manage-case-type.component";
import {ManageDocumentsListComponent} from "./documents/manage-documents-list.component";
import {ManageDocumentsListContentComponent} from "./documents/manage-documents-list-content.component";
import {ManageDocumentsListContentModalComponent} from "./documents/manage-documents-list-content-modal.component";
import {ManageDocumentsListContentListComponent} from "./documents/manage-documents-list-content-list.component";
import {DocumentCategoryFactory} from "../_model/case-document";
import {ManageGovFeeComponent} from "./govfee/manage-gov-fee.component";

/**
 * Created by Joinsu on 2018-07-29.
 */


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ManageRoutingModule
  ],
  declarations: [
    ManageComponent,
    ManageCompanyComponent,
    ManageCaseTypeComponent,
    ManageFeeComponent,
    ManageStaffComponent,
    ManageStaffModalComponent,
    ManageDocumentsListComponent,
    ManageDocumentsListContentComponent,
    ManageDocumentsListContentModalComponent,
    ManageDocumentsListContentListComponent,
    ManageGovFeeComponent
  ],
  exports: [
    ManageComponent
  ],
  providers: [
    CommonDataService,
    DocumentCategoryFactory
  ]
})
export class ManageModule {}
