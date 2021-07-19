import {Routes, RouterModule} from "@angular/router";
import {CaseDetailComponent} from "./case-detail.component";
import {NgModule} from "@angular/core";
/**
 * Created by Joinsu on 2019-05-02.
 */
const routes:Routes = [
  { path: '', component: CaseDetailComponent,
  }
];
@NgModule({
  imports: [ RouterModule.forChild( routes)],
  exports: [ RouterModule]
})
export class CaseDetailRoutingModule{}
