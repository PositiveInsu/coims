import {Routes, RouterModule} from "@angular/router";
import {CaseNewComponent} from "./case-new.component";
import {NgModule} from "@angular/core";
import {CaseNewPersonalInfoComponent} from "./case-new-personal-info.component";
import {CaseNewFeeComponent} from "./case-new-fee.component";
import {CaseNewDocumentComponent} from "./case-new-document.component";
import {CaseNewReviewComponent} from "./case-new-review.component";
import {CaseNewCompleteComponent} from "./case-new-complete.component";
/**
 * Created by Joinsu on 2018-12-14.
 */
const routes:Routes = [
  { path: '', component: CaseNewComponent,
    children:[
      { path: 'step1', component: CaseNewPersonalInfoComponent},
      { path: 'step2', component: CaseNewFeeComponent},
      { path: 'step3', component: CaseNewDocumentComponent},
      { path: 'step4', component: CaseNewReviewComponent},
      { path: 'step5', component: CaseNewCompleteComponent}
    ]
  }
];
@NgModule({
  imports: [ RouterModule.forChild( routes)],
  exports: [ RouterModule]
})
export class CaseNewRoutingModule{}
