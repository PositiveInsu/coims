import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CaseNewComponent} from "./case-new.component";
import {CaseNewRoutingModule} from "./case-new.routing.module";
import {CaseNewService} from "../../_service/case-new.service";
import {CaseNewPersonalInfoComponent} from "./case-new-personal-info.component";
import {CaseNewPersonalInfoDependentComponent} from "./case-new-personal-info-dependent.component";
import {CaseNewPersonalInfoDependentDirective} from "../../_directive/case-new-personal-info.directive";
import {CaseNewClientCheckModalComponent} from "./case-new-client-check-modal.component";
import {CaseNewCaseTypeComponent} from "./case-new-case-type.component";
import {CaseNewFeeComponent} from "./case-new-fee.component";
import {CaseNewFeeOtherComponent} from "./case-new-fee-other.component";
import {CaseNewFeeDependentDirective} from "../../_directive/case-new-fee-dependent.directive";
import {CaseNewFeeDependentComponent} from "./case-new-fee-dependent.component";
import {CaseNewDocumentComponent} from "./case-new-document.component";
import {CaseNewDocumentDependentDirective} from "../../_directive/case-new-document-dependent.directive";
import {CaseNewDocumentDependentComponent} from "./case-new-document-dependent.component";
import {CaseNewReviewComponent} from "./case-new-review.component";
import {CaseNewReviewPersonalComponent} from "./case-new-review-personal.component";
import {CaseNewReviewQnDComponent} from "./case-new-review-qnd.component";
import {CaseNewReviewPersonalDocComponent} from "./case-new-review-personal-doc.component";
import {CaseNewReviewConsultantFeeComponent} from "./case-new-review-consultant-fee.component";
import {CaseNewReviewGovFeeComponent} from "./case-new-review-gov-fee.component";
import {CaseNewReviewOtherFeeComponent} from "./case-new-review-other-fee.component";
import {CaseNewCompleteComponent} from "./case-new-complete.component";
/**
 * Created by Joinsu on 2018-12-14.
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CaseNewRoutingModule,
  ],
  declarations : [
    CaseNewComponent,
    CaseNewPersonalInfoComponent,
    CaseNewPersonalInfoDependentDirective,
    CaseNewPersonalInfoDependentComponent,
    CaseNewClientCheckModalComponent,
    CaseNewFeeComponent,
    CaseNewCaseTypeComponent,
    CaseNewFeeOtherComponent,
    CaseNewFeeDependentDirective,
    CaseNewFeeDependentComponent,
    CaseNewDocumentComponent,
    CaseNewDocumentDependentComponent,
    CaseNewDocumentDependentDirective,
    CaseNewReviewComponent,
    CaseNewReviewPersonalComponent,
    CaseNewReviewQnDComponent,
    CaseNewReviewPersonalDocComponent,
    CaseNewReviewConsultantFeeComponent,
    CaseNewReviewGovFeeComponent,
    CaseNewReviewOtherFeeComponent,
    CaseNewCompleteComponent
  ],
  exports: [
    CaseNewComponent,
    CaseNewReviewConsultantFeeComponent,
    CaseNewReviewGovFeeComponent,
    CaseNewReviewOtherFeeComponent,
  ],
  providers: [
    CaseNewService
  ],
  entryComponents: [
    CaseNewPersonalInfoDependentComponent,
    CaseNewFeeDependentComponent,
    CaseNewDocumentDependentComponent
  ],
})
export class CaseNewModule{}
