import {Component, OnInit} from "@angular/core";
import {MainService} from "../../_service/main.service";
import {MainComponent} from "../../main/main.component";
import {CaseNewService} from "../../_service/case-new.service";
import {NewCaseStep} from "../../_model/new-case-step";
/**
 * Created by Joinsu on 2018-12-14.
 */
@Component({
  selector:'coims-case-new',
  templateUrl: 'case-new.component.html',
  providers: []
})
export class CaseNewComponent implements OnInit{

  private _newCaseStepObj: NewCaseStep;

  constructor( private _mainService: MainService,
               private _caseNewService: CaseNewService,
               private _parent: MainComponent
  ){}

  ngOnInit(): void {
    this._mainService.changeMenu( this._mainService.leftMenuFactory.CASE_NEW);
    this._newCaseStepObj = this._caseNewService.newCaseStepObj;
    this._parent.detectChanges();
  }
}
