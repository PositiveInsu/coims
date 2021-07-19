import {Component, OnInit} from "@angular/core";
import {AppConfig} from "../app.config";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthService} from "../_service/auth.service";
import {ErrorService} from "../_service/error.service";
import {MainService} from "../_service/main.service";
import {CommonService} from "../_service/common.service";
import {LeftMenuFactory, Menu} from "../_model/menu";
/**
 * Created by Joinsu on 2018-07-29.
 */
@Component({
  selector:'coims-main-header',
  templateUrl: './main-header.component.html'
})
export class MainHeaderComponent implements OnInit{

  private _leftMenuFactory: LeftMenuFactory;

  constructor(
    private _config: AppConfig,
    private _http: HttpClient,
    private _router: Router,
    private _authService: AuthService,
    private _commonService: CommonService,
    private _mainService: MainService
  ){}

  ngOnInit(): void {
    this._leftMenuFactory = this._mainService.leftMenuFactory;
  }

// TODO logout 처리하기
  private doLogout() {
    this._http.post('logout', {}).subscribe( data => { this.afterCall( data, this._router)}, err => { this.afterError( err, this._router)});
  }

  private afterCall( data: any, router: Router) {
    this._authService.logout();
  }

  private afterError(err: any, router: Router) {
    this._authService.logout();
  }

  private selectLogo(){
    window.location.href = "/";
  }

  private moveToAddCase(){
    let menu: Menu = this._leftMenuFactory.CASE_NEW;
    this._mainService.changeMenu( menu);
    this.changePage( menu);
  }

  private changePage(menu: Menu) {
    if( menu.link.length > 0){
      this._router.navigate([ menu.link]);
    }
  }
}
