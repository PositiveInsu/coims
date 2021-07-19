import {Component, OnInit} from "@angular/core";
import {AppConfig} from "../../app.config";
import {MainService} from "../../_service/main.service";
import {Menu, LeftMenuFactory} from "../../_model/menu";
import {CommonService} from "../../_service/common.service";
import {Router} from "@angular/router";
/**
 * Created by Joinsu on 2018-07-29.
 */
@Component({
  selector:'coims-main-left',
  templateUrl: 'main-left-menu.component.html'
})
export class MainLeftMenuComponent implements OnInit{
  private _isLeftMenuOpen: boolean;
  private _leftMenuFactory: LeftMenuFactory;
  private _case: Menu;
  private _counsel: Menu;
  private _payment: Menu;
  private _adver: Menu;
  private _manage: Menu;
  private _caseType: Menu;
  private _compinfo: Menu;
  private _fee: Menu;
  private _question: Menu;
  private _documents: Menu;
  private _bill: Menu;
  private _bank: Menu;
  private _staff: Menu;
  private _govFee: Menu;

  constructor(
    private _config: AppConfig,
    private _commonService: CommonService,
    private _mainService: MainService,
    private _route: Router
  ){}

  ngOnInit(): void {
      this._isLeftMenuOpen = false;
      this._leftMenuFactory = this._mainService.leftMenuFactory;
      this.menuSetting();
  }

  private menuSetting() {
    this._case = this._leftMenuFactory.CASE_LIST;
    this._counsel = this._leftMenuFactory.COUNSEL;
    this._payment = this._leftMenuFactory.PAYMENT;
    this._adver = this._leftMenuFactory.ADVER;
    this._manage = this._leftMenuFactory.MANAGE;
    this._caseType = this._leftMenuFactory.CASETYPE;
    this._compinfo = this._leftMenuFactory.COMPINFO;
    this._fee = this._leftMenuFactory.FEE;
    this._question = this._leftMenuFactory.QUESTION;
    this._documents = this._leftMenuFactory.DOCUMENTS;
    this._bill = this._leftMenuFactory.BILL;
    this._bank = this._leftMenuFactory.BANK;
    this._staff = this._leftMenuFactory.STAFF;
    this._govFee = this._leftMenuFactory.GOVFEE;
  }

  private leftMenuHideShow(){
    this._isLeftMenuOpen = !this._isLeftMenuOpen;
  }

  private selectMenu( menu: Menu){
    this._mainService.changeMenu( menu);
    this.changePage( menu);
  }

  private changePage(menu: Menu) {
    if( menu.link.length > 0){
      this._route.navigate([ menu.link]);
    }
  }
}
