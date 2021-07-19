/**
 * Created by Joinsu on 2017-05-10.
 */
import {NgModule}                                 from "@angular/core";
import {CommonModule}                             from "@angular/common";
import {FormsModule, ReactiveFormsModule}         from "@angular/forms";
import {SignupRoutingModule}                      from "./signup.routing.module";
import {ProgressbarModule}                        from "ngx-bootstrap";

import {SignupService}                from "../_service/signup.service";
import {CommonDataService}               from "../_service/common-data.service";

import {SignupComponent}              from "./signup.component";
import {SignupPersonalInfoComponent}  from "./signup-personal-info.component";
import {SignupCompanyInfoComponent}   from "./signup-company-info.component";
import {SignupVerificationComponent}  from "./signup-verification.component";
import {SignupCompleteComponent}      from "./signup-complete.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SignupRoutingModule,
    ProgressbarModule.forRoot()
  ],
  declarations : [
    SignupComponent,
    SignupPersonalInfoComponent,
    SignupCompanyInfoComponent,
    SignupVerificationComponent,
    SignupCompleteComponent
  ],
  exports: [ SignupComponent],
  providers: [
    SignupService,
    CommonDataService
  ]
})
export class SignupModule{}
