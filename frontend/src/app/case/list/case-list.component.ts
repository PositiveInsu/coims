import {Component, OnInit} from "@angular/core";
import {MainService} from "../../_service/main.service";
import {MainComponent} from "../../main/main.component";
import {ListCaseDto} from "../../_model/case-dto";
import {HttpClient} from "@angular/common/http";
import {RestfulUrlService} from "../../_service/restful-url.service";
import {CommonService} from "../../_service/common.service";
import {ErrorService} from "../../_service/error.service";
import {Sort, PageDto} from "../../_model/page-dto";
import {AppConfig} from "../../app.config";
import {FormGroup, FormBuilder, AbstractControl, FormControl, Validators} from "@angular/forms";
import {CaseSearchDto} from "../../_model/search-dto";
import {SignupValidator} from "../../_validator/signup.validator";
import {CaseType} from "../../_model/case-type";
import {CaseStatus} from "../../_model/case-status";
import {Router} from "@angular/router";
import {HttpParams} from "@angular/common/http";
/**
 * Created by Joinsu on 2018-12-14.
 */
@Component({
  selector:'coims-case-list',
  templateUrl: 'case-list.component.html',
  providers: []
})
export class CaseListComponent implements OnInit{

  private _caseList: Array<ListCaseDto>;
  private _companyId: number;
  private _pageInfo: PageDto;
  private _searchDto: CaseSearchDto;
  private _ingSearchProcess: boolean;
  private _caseYearList: Array<number>;
  private _filterCaseType: CaseType;
  private _filterCaseStatus: CaseStatus;
  private _filterCaseYear: number;

  private _searchCase: FormGroup;
  private _searchText: AbstractControl;
  private _searchCondition: AbstractControl;

  private _filter: FormGroup;
  private _caseTypeCode: AbstractControl;
  private _caseStatusName: AbstractControl;
  private _caseYear: AbstractControl;

  constructor( private _commonService: CommonService,
               private _mainService: MainService,
               private _errService: ErrorService,
               private _appConfig: AppConfig,
               private _parent: MainComponent,
               private _http: HttpClient,
               private _urlService: RestfulUrlService,
               private _fb: FormBuilder,
               private _router: Router
  ){}

  ngOnInit(): void {
    this._mainService.changeMenu( this._mainService.leftMenuFactory.CASE_LIST);
    this.initValuables();
    this.initForm();
    this.initPageDto();
    this.initCaseList( this._pageInfo);
    this.initCaseYear();
    this._parent.detectChanges();
  }

  private initValuables(): void{
    this._caseList = new Array<ListCaseDto>();
    this._searchDto = new CaseSearchDto();
    this._companyId = this._commonService.user.getCompany().getId();
    this._ingSearchProcess = false;
    this._caseYearList = new Array<number>();
  }

  private initForm(): void{
    this._searchText = new FormControl( '', {updateOn:'blur', validators: Validators.pattern( SignupValidator.stringNumberRegExp)});
    this._searchCondition = new FormControl( 'fName');

    this._searchCase = this._fb.group({
      searchText: this._searchText,
      searchCondition: this._searchCondition
    });

    this._caseTypeCode = new FormControl( '');
    this._caseTypeCode.disable();
    this._caseStatusName = new FormControl( '');
    this._caseStatusName.disable();
    this._caseYear = new FormControl( '');

    this._filter = this._fb.group({
      caseTypeCode: this._caseTypeCode,
      caseStatusName: this._caseStatusName,
      caseYear: this._caseYear
    })
  }

  private initCaseList( pageInfo: PageDto): void{
    this._http.post( this._urlService.findCaseList, { companyId: this._companyId, pageRequest: pageInfo, caseSearchDto: this._searchDto}, { headers: this._urlService.headerJson})
      .subscribe( res => { this.setData( res)}, err => { this.afterError( err, this._companyId + "- Company case list find error")});
  }

  private setData(res: any): void{
    this.setPageData( res);
    this.setListData( res);
    this._ingSearchProcess = false;
  }

  private initCaseYear() {
    this._http.get( this._urlService.findAllCaseYear, { headers: this._urlService.headerTextPlain, params: new HttpParams().set( "id", this._companyId.toString())})
      .subscribe( res => { this.setYearData( res)}, err => { this.afterError( err, "Find all case year data.")});
  }

  private setYearData(res: any) {
    if( res){
      for( let year of res){
        this._caseYearList.push( year);
      }
    }
  }

  private initPageDto() {
    let sortList: Array<Sort> = new Array<Sort>();
    sortList.push( new Sort().targetWithDESC( "createdDate"));
    this._pageInfo = new PageDto(0, this._appConfig.casePageSize, sortList);
  }

  private setListData(res: any): void{
    this._caseList = new Array<ListCaseDto>();
    for( let content of res.content){
      let listCaseDto : ListCaseDto = new ListCaseDto();
      listCaseDto.setDataFromResponse( content);
      this._caseList.push( listCaseDto);
    }
  }

  private setPageData(res: any): void{
    this._pageInfo.setTotalElement( res.totalElement);
    this._pageInfo.setTotalPage( res.totalPage);
  }

  private afterError( err: any, evidence: string): void{
    this._errService.reportError( err, evidence);
  }

  private getStringDate( date: Date): string{
    if( date){
      return this._commonService.getStringDateFromDate( date);
    }
    return "-";
  }

  private validateData( value: any): any{
    if( value){
      return value;
    }
    return "-";
  }

  private moveToPage( pageDto: PageDto): void{
    this.initCaseList( pageDto);
  }

  private searchAllCase(): void{
    if(!this._ingSearchProcess){
      this.resetSearchDto();
      this.initCaseList( this._pageInfo);
      this._ingSearchProcess = true;
      this.resetForm();
    }
  }

  private resetSearchDto(): void{
    this._searchDto = new CaseSearchDto();
  }

  private checkHasError( formControlObj:FormControl): boolean{
    return formControlObj.touched && !formControlObj.valid;
  }

  private setDataToSearchDto(): void{
    if( this.isHasValue( 'fName')){
      this._searchDto.setFirstName( this._searchText.value);
    }else if( this.isHasValue( 'caseNo')){
      this._searchDto.setCaseNo( this._searchText.value);
    }else if( this.isHasValue( 'fileNo')){
      this._searchDto.setFileNo( this._searchText.value);
    }else if( this.isHasValue( 'uciNo')){
      this._searchDto.setUciNo( this._searchText.value);
    }

    if( this._filterCaseStatus){
      this._searchDto.setCaseStatusId( this._filterCaseStatus.getId());
    }
    if( this._filterCaseType){
      this._searchDto.setCaseCode( this._filterCaseType.getCode());
    }
    if( this._filterCaseYear){
      this._searchDto.setCaseYear( this._filterCaseYear);
    }
  }

  private isHasValue( conditionName: string): boolean {
    return this._searchCondition.value === conditionName && this._searchText.value != null && this._searchText.value.length > 0;
  }

  private isPossibleSearch(): boolean{
    return this._searchText.valid  && this._searchText.value.length > 0 && !this._ingSearchProcess;
  }

  private resetForm(): void{
    this._searchCondition.setValue( 'fName');
    this._searchText.setValue( '');

    this._caseYear.setValue( '');
    this._caseTypeCode.setValue( '');
    this._caseStatusName.setValue( '');
    this._filterCaseType = null;
    this._filterCaseStatus = null;
    this._filterCaseYear = null;
  }

  private setCaseTypeFilterData( caseType: CaseType): void{
    if( caseType){
      this._caseTypeCode.setValue( caseType.getCode());
      this._filterCaseType = caseType;
    }else{
      this._caseTypeCode.setValue( null);
      this._filterCaseType = null;
    }
  }

  private setCaseStatusFilterData( caseStatus: CaseStatus): void{
    if( caseStatus){
      this._caseStatusName.setValue( caseStatus.getName());
      this._filterCaseStatus = caseStatus;
    }else{
      this._caseStatusName.setValue( null);
      this._filterCaseStatus = null;
    }
  }

  private setCaseYearFilterData( year: number): void{
    if( year){
      this._filterCaseYear = year;
    }
  }

  private searchCase(): void{
    if( this.isPossibleSearch()){
      this.resetSearchDto();
      this.setDataToSearchDto();
      this.initPageDto();
      this.initCaseList( this._pageInfo);
      this._ingSearchProcess = true;
    }
  }

  private filteringCase(): void{
    this.setDataToSearchDto();
    this.initPageDto();
    this.initCaseList( this._pageInfo);
  }

  private changeCaseNo(): void{
    if( this.isHasValue( 'caseNo')){
      this._searchText.setValue( this._commonService.addZeroToCaseNo( this._searchText.value));
    }
  }

  private moveToDetailPage( caseNo: string): void{
    this._router.navigate(['/case/detail', caseNo]);
  }
}









