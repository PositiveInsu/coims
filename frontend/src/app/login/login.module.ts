/**
 * Created by Joinsu on 2017-04-30.
 */
import {NgModule}           from "@angular/core";
import {CommonModule}       from "@angular/common";
import {FormsModule}        from "@angular/forms";
import {LoginComponent}     from "./login.component";
import {LoginRoutingModule} from "./login.routing.module";

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
  providers: []

})
export class LoginModule {}
