/**
 * Created by Joinsu on 2017-05-06.
 */
import {Component, OnInit, ChangeDetectorRef} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {CommonService} from "../_service/common.service";
import {MainService} from "../_service/main.service";
import {BreadCrumb} from "../_model/bread-crumb";
import {DataLoadService} from "../_service/data-load.service";
@Component({
  selector:'coims-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit{

  private _isOverviewOpen: boolean = false;

  constructor( private _route: ActivatedRoute,
               private _mainService: MainService,
               private _commonService: CommonService,
               private _dataLoadService: DataLoadService,
               private _cdref: ChangeDetectorRef
  ){}

  ngOnInit(): void {
    this._commonService.user = this._route.snapshot.data['authenticatedUserData'];
    this._dataLoadService.initCaseTypeList();
    this._mainService.setLeftMenuFactory( this._commonService.user)
  }

  set isOverviewOpen(value: boolean) {
    this._isOverviewOpen = !value;
  }

  isBreadcrumbOpen(): boolean{
    let openFlag: boolean = false;
    let beradcrumbList: Array<BreadCrumb> = this._mainService.breadCrumbList;

    if( beradcrumbList){
      openFlag = true;
    }
    return openFlag;
  }

  detectChanges(){
    this._cdref.detectChanges();
  }
}
