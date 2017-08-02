/**
 * Created by Joinsu on 2017-04-30.
 */
import {NgModule}           from "@angular/core";
import {CommonModule}       from "@angular/common";
import {FormsModule}        from "@angular/forms";

import {LoginRoutingModule} from "./login.routing.module";
import {LoginService}       from "./login.service";

import {LoginComponent}             from "./login.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LoginRoutingModule
  ],
  declarations: [
    LoginComponent
  ],
  exports: [
    LoginComponent
  ],
  providers: [
    LoginService
  ]
})
export class LoginModule {}
