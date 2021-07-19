import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MainRoutingModule} from "./main.routing.module";
import {AuthService} from "../_service/auth.service";
import {ErrorService} from "../_service/error.service";
import {MainService} from "../_service/main.service";
import {MainComponent} from "./main.component";
import {MainLeftMenuComponent} from "./leftmenu/main-left-menu.component";
import {MainHeaderComponent} from "./main-header.component";
import {MainFooterComponent} from "./main-footer.component";

/**
 * Created by Joinsu on 2018-07-29.
 */


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MainRoutingModule
  ],
  declarations: [
    MainComponent,
    MainLeftMenuComponent,
    MainHeaderComponent,
    MainFooterComponent,
  ],
  exports: [
    MainComponent
  ],
  providers: [
    AuthService,
    ErrorService,
    MainService,
  ]
})
export class MainModule {}
