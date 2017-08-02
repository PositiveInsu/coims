/**
 * Created by Joinsu on 2017-05-10.
 */
import {NgModule}             from "@angular/core";
import {Routes, RouterModule} from "@angular/router";

import {SignupComponent}              from "./signup.component";
import {SignupPersonalInfoComponent}  from "./signup-personal-info.component";
import {SignupCompanyInfoComponent}   from "./signup-company-info.component";
import {SignupVerificationComponent}  from "./signup-verification.component";
import {SignupCompleteComponent}      from "./signup-complete.component";

const routes:Routes = [
  { path: '', component: SignupComponent,
    children:[
      { path: 'step1', component: SignupPersonalInfoComponent},
      { path: 'step2', component: SignupCompanyInfoComponent},
      { path: 'step3', component: SignupVerificationComponent},
      { path: 'step4', component: SignupCompleteComponent}
    ]
  }
];
@NgModule({
  imports: [ RouterModule.forChild( routes)],
  exports: [ RouterModule]
})
export class SignupRoutingModule{}
