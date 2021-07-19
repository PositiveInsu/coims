import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {CaseComponent} from "./case.component";
import {CaseListComponent} from "./list/case-list.component";
import {CaseDetailComponent} from "./detail/case-detail.component";
/**
 * Created by Joinsu on 2018-12-14.
 */
const routes:Routes = [
  { path: '', component: CaseComponent,
    children:[
      { path: 'list', component: CaseListComponent},
      { path: 'new', loadChildren: 'app/case/new/case-new.module#CaseNewModule'},
      { path: 'detail/:caseNo', loadChildren: 'app/case/detail/case-detail.module#CaseDetailModule'},
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild( routes)],
  exports: [ RouterModule]
})
export class CaseRoutingModule{}
