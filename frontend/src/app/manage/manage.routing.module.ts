import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {ManageStaffComponent} from "../manage/staff/manage-staff.component";
import {ManageComponent} from "./manage.component";
import {ManageCompanyComponent} from "./company/manage-company.component";
import {ManageFeeComponent} from "./fee/manage-fee.component";
import {ManageCaseTypeComponent} from "./casetype/manage-case-type.component";
import {ManageDocumentsListComponent} from "./documents/manage-documents-list.component";
import {ManageGovFeeComponent} from "./govfee/manage-gov-fee.component";

/**
 * Created by Joinsu on 2018-08-03.
 */

const routes:Routes = [
  { path: '', component: ManageComponent,
    children:[
      { path: 'company', component: ManageCompanyComponent},
      { path: 'casetype', component: ManageCaseTypeComponent},
      { path: 'fee', component: ManageFeeComponent},
      { path: 'documents', component: ManageDocumentsListComponent},
      { path: 'staff', component: ManageStaffComponent},
      { path: 'govfee', component: ManageGovFeeComponent}
    ]}
];
@NgModule({
  imports: [ RouterModule.forChild( routes)],
  exports: [ RouterModule]
})
export class ManageRoutingModule{}
