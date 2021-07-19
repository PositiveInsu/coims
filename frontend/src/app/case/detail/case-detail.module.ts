import {NgModule} from "@angular/core";
import {CaseDetailComponent} from "./case-detail.component";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CaseDetailRoutingModule} from "./case-detail-routing.module";
import {CaseDetailStatusModalComponent} from "./case-detail-status-modal.component";
import {CaseDetailContractComponent} from "./content/case-detail-contract.component";
import {CaseDetailService} from "../../_service/case-detail.service";
import {CaseDetailContentDirective} from "../../_directive/case-detail-content.directive";
import {FileUploadComponent} from "../../common/file-upload.component";
import {DetailsUploadComponent} from "../../common/detail-upload.component";
import {FormUploadComponent} from "../../common/form-upload.component";
import {FileService} from "../../_service/file.service";
import {CaseNewModule} from "../new/case-new.module";
import {FileDropModule} from "ngx-file-drop";
import {CaseDetailPaymentComponent} from "./content/case-detail-payment.component";
import {CaseDetailPortalComponent} from "./content/case-detail-portal.component";
import {CaseDetailPersonalInfoModalComponent} from "./case-detail-personal-info-modal.component";
import {CaseDetailIconInfoModalComponent} from "./case-detail-icon-info-modal.component";
import {CaseDetailCaseOverviewComponent} from "./case-detail-case-overview.component";
/**
 * Created by Joinsu on 2019-05-02.
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CaseDetailRoutingModule,
    CaseNewModule,
    FileDropModule
  ],
  declarations : [
    CaseDetailComponent,
    CaseDetailStatusModalComponent,
    CaseDetailContentDirective,
    CaseDetailContractComponent,
    CaseDetailPaymentComponent,
    CaseDetailPortalComponent,
    CaseDetailCaseOverviewComponent,
    CaseDetailIconInfoModalComponent,
    CaseDetailPersonalInfoModalComponent,
    FileUploadComponent,
    DetailsUploadComponent,
    FormUploadComponent,
  ],
  exports: [ CaseDetailComponent],
  providers: [
    CaseDetailService,
    FileService,
  ],
  entryComponents: [
    CaseDetailContractComponent,
    CaseDetailPaymentComponent,
    CaseDetailPortalComponent
  ],
})
export class CaseDetailModule{}




