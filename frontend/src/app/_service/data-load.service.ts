import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User}     from "../_model/user";
import {AuthService}  from "./auth.service";
import {ErrorService} from "./error.service";
import {Observable} from "rxjs";
import 'rxjs/add/operator/toPromise';
import {RestfulUrlService} from "./restful-url.service";
import {CommonService} from "./common.service";
import {CaseType, CaseTypeCategory} from "../_model/case-type";
import {HttpErrorResponse} from "@angular/common/http";
/**
 * Created by Joinsu on 2018-07-31.
 */

@Injectable()
export class DataLoadService{

  private _user: User;

  constructor( private _http: HttpClient,
               private _urlService: RestfulUrlService,
               private _authService: AuthService,
               private _errService: ErrorService,
               private _commonService: CommonService
  ){}

  getAuthenticatedUser(): Observable<any> {
    let userEmail = this._authService.authenticatedUserInfo;
    return this._http.post( this._urlService.findUser, userEmail).map(res => { return this.userSetting( res);}, err => { this._errService.reportError( err, userEmail);});
  }

  private userSetting( responseData): User{
    this._user = new User();
    this._user.setDataFromResponse( responseData);
    return this._user;
  }

  // CaseTypeSetting - Start
  initCaseTypeList() {
    let companyId: number = this._commonService.user.getCompany().getId();
    this._http.post( this._urlService.findCaseTypeList, companyId, { headers: this._urlService.headerJson})
      .subscribe( data => this.afterSubmit( data),  ( err :HttpErrorResponse)=> this.afterError( err, companyId));
  }

  reLoadedCaseTypeCategory( data: any){
    this.afterSubmit( data);
  }

  private afterSubmit(data: any) {
    let responseList = Array.from( data);
    let caseTypeList: Array<CaseType> = this.setCaseTypeList( responseList);
    let caseTypeCategory: CaseTypeCategory = this.setCaseTypeCategoryObj( caseTypeList);
    this._commonService.setCaseTypeCategory( caseTypeCategory);
  }

  private setCaseTypeList(responseList: any): Array<CaseType>{
    let caseTypeListParent: Array<CaseType> = new Array<CaseType>();
    let caseTypeListChild: Array<CaseType> = new Array<CaseType>();

    for( let responseData of responseList){
      let caseTypeObj: CaseType = new CaseType();
      caseTypeObj.setDataFromResponse( responseData);

      if( this.checkChildCaseType( caseTypeObj)){
        caseTypeListChild.push( caseTypeObj)
      }else{
        caseTypeListParent.push( caseTypeObj);
      }
    }
    return this.getCaseTypeList( caseTypeListParent, caseTypeListChild);;
  }

  private getCaseTypeList(caseTypeListParent: Array<CaseType>, caseTypeListChild: Array<CaseType>): Array<CaseType> {
    for( let caseType of caseTypeListChild){
      this.setChildToParent( caseTypeListParent, caseType);
    }
    return caseTypeListParent;
  }

  private setChildToParent(caseTypeListParent: Array<CaseType>, childCaseType: CaseType): Array<CaseType> {
    for( let parentCaseType of caseTypeListParent){
      if( parentCaseType.getId() === childCaseType.getPid()){
        parentCaseType.chlidCaseTypeList.push( childCaseType);
      }
    }
    return caseTypeListParent;
  }

  private setCaseTypeCategoryObj( caseTypeList: Array<CaseType>) : CaseTypeCategory{
    let caseTypeCategory: CaseTypeCategory = new CaseTypeCategory();
    for( let caseType of caseTypeList){
      this.setCaseTypeToCategory( caseTypeCategory, caseType);
    }
    return caseTypeCategory;
  }

  private setCaseTypeToCategory( caseTypeCategory: CaseTypeCategory, caseType: CaseType): CaseTypeCategory {
    for( let category in caseTypeCategory){
      if( caseType.getCategory() === category){
        caseTypeCategory[ category].push( caseType);
      }
    }
    return caseTypeCategory;
  }
  // CaseTypeSetting - End

  private checkChildCaseType( caseTypeObj: CaseType): boolean {
    return caseTypeObj.getPid() !== 0;
  }

  private afterError(err: HttpErrorResponse, requestValue: any) {
    this._errService.reportError( err, requestValue);
    // TODO Error 발생하면 안내창 내보이기 -> 안내창 필요
  }
}
