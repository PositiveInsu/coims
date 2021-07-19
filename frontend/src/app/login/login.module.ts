/**
 * Created by Joinsu on 2017-04-30.
 */
import {NgModule}           from "@angular/core";
import {CommonModule}       from "@angular/common";
import {FormsModule, ReactiveFormsModule}        from "@angular/forms";

import {LoginComponent}             from "./login.component";
import {AuthService}                from "../_service/auth.service";
import {LoginRoutingModule} from "./login.routing.module";
import {ErrorService} from "../_service/error.service";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoginRoutingModule
  ],
  declarations: [
    LoginComponent
  ],
  exports: [
    LoginComponent
  ],
  providers: [
    ErrorService,
    AuthService
  ]
})
export class LoginModule {}
