import {Component, OnInit} from "@angular/core";
import {CommonService} from "../../_service/common.service";
import {MainService} from "../../_service/main.service";
import {MainComponent} from "../../main/main.component";
import {CaseTypeCategory, CaseType} from "../../_model/case-type";
/**
 * Created by Joinsu on 2018-09-25.
 */
@Component({
  selector:'coims-manage-documents-list',
  templateUrl: './manage-documents-list.component.html',
  providers: []
})
export class ManageDocumentsListComponent implements OnInit{
  private _caseTypeCategory: CaseTypeCategory;
  private _categoryKeyList: Array<string>;
  private _currentCaseTypeName: string;
  private _caseType: CaseType;

  constructor(private _commonService: CommonService,
              private _mainService: MainService,
              private _parent: MainComponent,
  ){}

  ngOnInit(): void {
    this._mainService.changeMenu( this._mainService.leftMenuFactory.DOCUMENTS);
    this.initVariables();
    this._parent.detectChanges();
  }

  private initVariables() {
    this._caseType = null;
    this._caseTypeCategory = new CaseTypeCategory();
    this._categoryKeyList = Object.keys( this._caseTypeCategory);
    this._commonService.getCaseTypeCategory().subscribe( (obj: CaseTypeCategory) => { this.setCaseTypeCategory( obj)});
  }

  private setCaseTypeCategory(obj: CaseTypeCategory) {
    if( obj !== null){
      this._caseTypeCategory = obj;
    }
  }

  private selectCaseType( caseType: CaseType){
    this._currentCaseTypeName = caseType.getName();
    this._caseType = caseType;
  }

  private isActive( caseTypeName: string): boolean{
    return this._currentCaseTypeName === caseTypeName;
  }

  private scrollToTop(){
    window.scrollTo(0, 0);
  }
}
