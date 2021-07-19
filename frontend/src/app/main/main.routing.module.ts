import {Routes, RouterModule} from "@angular/router";
import {MainComponent} from "./main.component";
import {NgModule} from "@angular/core";
/**
 * Created by Joinsu on 2018-07-29.
 */
const routes:Routes = [
  { path: '', component: MainComponent,
    children:[
      { path: 'manage', loadChildren: 'app/manage/manage.module#ManageModule'},
      { path: 'case', loadChildren: 'app/case/case.module#CaseModule'},
    ]}
];
@NgModule({
  imports: [ RouterModule.forChild( routes)],
  exports: [ RouterModule]
})
export class MainRoutingModule{}
