import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app.routing.module";
import {AppConfig} from "./app.config";
import {AppComponent} from "./app.component";
import {PageNotFoundComponent} from "./common/page-not-found.component";
import {AuthGuard} from "./_guard/auth.guard";
import {AuthService} from "./_service/auth.service";
import {ErrorService} from "./_service/error.service";
import {DataLoadService} from "./_service/data-load.service";
import {GetAuthenticatedUserResolve} from "./_resolve/get-authenticated-user.resolve";
import {RoleType} from "./_model/role-type";
import {RestfulUrlService} from "./_service/restful-url.service";
import {CommonService} from "./_service/common.service";

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [
    AppConfig,
    AuthGuard,
    AuthService,
    RoleType,
    ErrorService,
    RestfulUrlService,
    CommonService,
    DataLoadService,
    GetAuthenticatedUserResolve
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
