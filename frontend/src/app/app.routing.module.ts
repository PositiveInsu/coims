import {NgModule}             from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent}       from "./login/login.component";
/**
 * Created by Joinsu on 2017-04-30.
 */
const routes:Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports:[ RouterModule.forRoot( routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

