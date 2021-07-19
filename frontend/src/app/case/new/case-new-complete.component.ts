import {OnInit, Component, OnDestroy} from "@angular/core";
import {Router} from "@angular/router";
import {CaseNewService} from "../../_service/case-new.service";
/**
 * Created by Joinsu on 2019-04-24.
 */
@Component({
  selector:'coims-case-new-complete',
  templateUrl: 'case-new-complete.component.html',
  providers: []
})
export class CaseNewCompleteComponent implements OnInit, OnDestroy{

  private _caseNo: string;
  private _isNullCaseDto: boolean;

  constructor(private _router: Router,
              private _caseNewService: CaseNewService
  ) {}

  ngOnInit(): void {
    this.checkExistCaseDto();
  }

  private checkExistCaseDto() {
    this._isNullCaseDto = this._caseNewService.isNullCaseDtoContainerList();
    if( this._isNullCaseDto){
      // Todo: move to case list page
      this.goCaseList();
      this._caseNo = "";
    }else{
      this._caseNo =  this._caseNewService.caseDtoContainerList[ this._caseNewService.MAIN_CASE_NUMBER].caseDto.getCaseNo();
    };
  }

  private goCaseList(): void{
    this._router.navigate([ '/case/list']);
  }

  private goCaseDetail(): void{
    console.log( this._caseNo);
  }

  ngOnDestroy(): void {
    this._caseNewService.destroyCaseDtoContainerList();
  }
}
