import {Injectable} from "@angular/core";
import {LeftMenuFactory, Menu} from "../_model/menu";
import {RoleType} from "../_model/role-type";
import {User} from "../_model/user";
import {BreadCrumb} from "../_model/bread-crumb";
/**
 * Created by Joinsu on 2018-07-30.
 */

@Injectable()
export class MainService {

  private _breadCrumbList: Array<BreadCrumb>;
  private _leftMenuFactory: LeftMenuFactory;

  constructor( private _roleType: RoleType){}

  setLeftMenuFactory( user: User): LeftMenuFactory{
    this._leftMenuFactory = new LeftMenuFactory( user);
    return this._leftMenuFactory;
  }

  get leftMenuFactory(): LeftMenuFactory {
    return this._leftMenuFactory;
  }

  changeMenu( menu: Menu){
    this.setCurrentMenu( menu);
    this.setBreadCrumb( menu);
  }

  private setCurrentMenu( menu: Menu){
    this._leftMenuFactory.setCurrentMenu( menu);
  }

  clearBreadCrumbList(){
    this._breadCrumbList = null;
  }

  private setBreadCrumb( menu: Menu) {
    if( menu.link.length === 0){
      return;
    }
    this._breadCrumbList = new Array<BreadCrumb>();
    if( menu.parentMenu){
      this._breadCrumbList.push( new BreadCrumb( menu.parentMenu.name, menu.parentMenu.link));
    }
    this._breadCrumbList.push( new BreadCrumb( menu.name, menu.link));
  }

  get breadCrumbList(): Array<BreadCrumb> {
    return this._breadCrumbList;
  }
}
