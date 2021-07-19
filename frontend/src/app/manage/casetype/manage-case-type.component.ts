import {Component, OnInit} from "@angular/core";
import {MainService} from "../../_service/main.service";
import {CommonService} from "../../_service/common.service";
import {MainComponent} from "../../main/main.component";
import {CaseTypeCategory} from "../../_model/case-type";
import {Router} from "@angular/router";
import {ErrorService} from "../../_service/error.service";
/**
 * Created by Joinsu on 2018-09-12.
 */
@Component({
  selector:'coims-manage-case-type',
  templateUrl: 'manage-case-type.component.html',
  providers: []
})
export class ManageCaseTypeComponent implements OnInit{

  private _caseTypeList: CaseTypeCategory;
  private _keys:Array<string>;

  constructor( private _mainService: MainService,
               private _commonService: CommonService,
               private _parent: MainComponent,
               private _errService: ErrorService
  ){}

  ngOnInit(): void {
    this._mainService.changeMenu( this._mainService.leftMenuFactory.CASETYPE);
    this.initValuable();
    this._parent.detectChanges();
  }

  private initValuable() {
    this._commonService.getCaseTypeCategory().subscribe( obj => { this.setCaseTypeCategory( obj)});
  }

  private setCaseTypeCategory(obj: any) {
    if( obj !== null){
      this._caseTypeList = obj;
      this._keys = Object.keys( this._caseTypeList);
    }
  }
}
