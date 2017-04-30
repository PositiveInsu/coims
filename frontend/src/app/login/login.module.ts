/**
 * Created by Joinsu on 2017-04-30.
 */
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {LoginComponent} from "./login.component";
@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    LoginComponent
  ],
  exports: [ LoginComponent ],
  providers: []

})
export class LoginModule{ }
