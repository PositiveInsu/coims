import {RoleType} from "./role-type";
import {User} from "./user";
/**
 * Created by Joinsu on 2018-08-02.
 */
export class Menu{

  constructor(
              private _name: string,
              private _link: string,
              private _role: string,
              private _isOn: boolean,
              private _parentMenu?: Menu,
  ){}

  get parentMenu(): Menu {
    return this._parentMenu;
  }

  set parentMenu(value: Menu) {
    this._parentMenu = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get link(): string {
    return this._link;
  }

  set link(value: string) {
    this._link = value;
  }

  get role(): string {
    return this._role;
  }

  set role(value: string) {
    this._role = value;
  }

  get isOn(): boolean {
    return this._isOn;
  }

  set isOn(value: boolean) {
    this._isOn = value;
  }
}

export class LeftMenuFactory{

  private _roleType: RoleType = new RoleType();
  private _currentMenu: Menu;

  private _CASE: Menu;
  private _CASE_LIST: Menu;
  private _CASE_NEW: Menu;
  private _CASE_DETAIL: Menu;
  private _COUNSEL: Menu;
  private _PAYMENT: Menu;
  private _ADVER: Menu;
  private _MANAGE: Menu;
  private _COMPINFO: Menu;
  private _CASETYPE: Menu;
  private _FEE: Menu;
  private _QUESTION: Menu;
  private _DOCUMENTS: Menu;
  private _BILL: Menu;
  private _BANK: Menu;
  private _STAFF: Menu;
  private _GOVFEE: Menu;

  constructor( private _user: User){
    this.init();
  }

  private init(){
    this._CASE = new Menu( "Case", "/case", this._roleType.USER, false);
    this._CASE_LIST = new Menu( "Case List", "/case/list", this._roleType.USER, false, this._CASE);
    this._CASE_NEW = new Menu( "New Case", "/case/new/step1", this._roleType.USER, false, this._CASE);
    this._CASE_DETAIL = new Menu( "Detail", "/case/detail", this._roleType.USER, false, this._CASE);
    this._COUNSEL = new Menu( "Counsel", "", this._roleType.USER, false);
    this._PAYMENT = new Menu( "Payment", "", this._roleType.USER, false);
    this._ADVER = new Menu( "Advertisement", "", this._roleType.USER, false);

    if( this.isManagerUser()) {
      this._MANAGE = new Menu( "Management", "", this._roleType.MANAGER, false);
      this._COMPINFO = new Menu( "Company Information", "/manage/company", this._roleType.MANAGER, false, this._MANAGE);
      this._CASETYPE = new Menu( "Case Type", "/manage/casetype", this._roleType.MANAGER, false, this._MANAGE);
      this._FEE = new Menu( "Consultant Fee", "/manage/fee", this._roleType.MANAGER, false, this._MANAGE);
      this._QUESTION = new Menu( "Questionnaire", "", this._roleType.MANAGER, false, this._MANAGE);
      this._DOCUMENTS = new Menu( "Documents List", "/manage/documents", this._roleType.MANAGER, false, this._MANAGE);
      this._BILL = new Menu( "My Bill", "", this._roleType.MANAGER, false, this._MANAGE);
      this._BANK = new Menu( "Bank Accounts", "", this._roleType.MANAGER, false, this._MANAGE);
      this._STAFF = new Menu( "Staff", "/manage/staff", this._roleType.MANAGER, false, this._MANAGE);
      this._GOVFEE = new Menu( "Government Fee", "/manage/govfee", this._roleType.MANAGER, false, this._MANAGE);
    }
  }

  private isManagerUser() {
    for( let role of this._user.getRoles()) {
      if( role.getRole() === this._roleType.MANAGER || role.getRole() === this._roleType.ADMIN){
        return true;
      }
    }
    return false;
  }

  setCurrentMenu( menu: Menu) {
    this.offMenuList();
    this.onMenuList( menu);
    this._currentMenu = menu;
  }

  private offMenuList() {
    if( this._currentMenu){
      this.offMenu( this._currentMenu);
      if( this._currentMenu.parentMenu){
        this.offMenu( this._currentMenu.parentMenu);
      }
    }
  }

  private offMenu( menu: Menu) {
    menu.isOn = false;
  }

  private onMenuList( menu: Menu) {
    if( menu.parentMenu){
      menu.parentMenu.isOn = true;
    }
    menu.isOn = true;
  }

  get CASE_LIST(): Menu {
    return this._CASE_LIST;
  }

  get CASE_NEW(): Menu {
    return this._CASE_NEW;
  }

  get CASE_DETAIL(): Menu {
    return this._CASE_DETAIL;
  }

  get COUNSEL(): Menu {
    return this._COUNSEL;
  }

  get PAYMENT(): Menu {
    return this._PAYMENT;
  }

  get ADVER(): Menu {
    return this._ADVER;
  }

  get MANAGE(): Menu {
    return this._MANAGE;
  }

  get CASETYPE(): Menu {
    return this._CASETYPE;
  }

  get COMPINFO(): Menu {
    return this._COMPINFO;
  }

  get FEE(): Menu {
    return this._FEE;
  }

  get QUESTION(): Menu {
    return this._QUESTION;
  }

  get DOCUMENTS(): Menu {
    return this._DOCUMENTS;
  }

  get BILL(): Menu {
    return this._BILL;
  }

  get BANK(): Menu {
    return this._BANK;
  }

  get STAFF(): Menu {
    return this._STAFF;
  }

  get GOVFEE(): Menu {
    return this._GOVFEE;
  }
}
