import {NgModule}               from "@angular/core";
import {RouterModule, Routes}   from "@angular/router";

import {LoginComponent}         from "./login.component";

/**
 * Created by Joinsu on 2017-04-30.
 */
const routes:Routes = [
  { path: '', component: LoginComponent},
];

@NgModule({
  imports:[ RouterModule.forChild( routes) ],
  exports: [ RouterModule ]
})
export class LoginRoutingModule {}

