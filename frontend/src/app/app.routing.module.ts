import {NgModule}             from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PageNotFoundComponent} from "./common/page-not-found.component";
import {AuthGuard} from "./_guard/auth.guard";
import {GetAuthenticatedUserResolve} from "./_resolve/get-authenticated-user.resolve";
/**
 * Created by Joinsu on 2017-04-30.
 */
const routes:Routes = [
  { path: '', loadChildren: 'app/main/main.module#MainModule', canActivate: [AuthGuard], resolve:{ authenticatedUserData: GetAuthenticatedUserResolve}},
  { path: 'login', loadChildren: 'app/login/login.module#LoginModule'},
  { path: 'signup', loadChildren: 'app/signup/signup.module#SignupModule'},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports:[ RouterModule.forRoot( routes, { useHash: true }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

