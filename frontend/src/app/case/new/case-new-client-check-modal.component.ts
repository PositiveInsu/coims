import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RestfulUrlService} from "../../_service/restful-url.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ErrorService} from "../../_service/error.service";
import {User} from "../../_model/user";
import {CommonService} from "../../_service/common.service";
import {UserType} from "../../_model/user-type";
import {CountCaseDto} from "../../_model/case-dto";
declare var $ :any;
/**
 * Created by Joinsu on 2019-02-22.
 */
@Component({
  selector:'coims-case-new-client-check-modal',
  templateUrl: './case-new-client-check-modal.component.html',
  providers: []
})
export class CaseNewClientCheckModalComponent implements OnInit {

  private _email: string;
  private _clientList: Array<User>;
  private _tempClientList: Array<User>;
  private _isDataExist: boolean;
  private _userType: UserType;
  private _countCaseList: Array<CountCaseDto>;

  @Output() completedClientCheck = new EventEmitter<User>();

  @Input() hasError: boolean;

  @Input() modal_no: number;

  @Input()
  set clientEmail( email: string) {
    if( !email){
      return;
    }
    if( email.length < 5 || this.hasError){
      return;
    }
    this._email = email;
    this._http.post( this._urlService.findClientUser, this._email, { headers: this._urlService.headerTextPlain})
      .subscribe( data => this.afterClientFind( data), (err :HttpErrorResponse)=> this._errService.reportError( err, this._email));
  }

  constructor( private _http: HttpClient,
               private _urlService: RestfulUrlService,
               private _errService: ErrorService,
               private _commonService: CommonService
  ){}

  ngOnInit(): void {
    this._userType = new UserType();
    this._isDataExist = false;
    this._countCaseList = new Array<CountCaseDto>();
  }

  private afterClientFind(data: any): void{
    this.setTempClientData( data);
    this.findCountCaseByUserList();
  }

  private changeBirthDate(originalDate: Date): string{
    if( originalDate){
      return this._commonService.getStringDateFromDate( originalDate);
    }
    return "";
  }

  private checkComplete(user ?:User ): void{
    this.completedClientCheck.emit( user);
    $('#client-email-check-'+ this.modal_no).modal('hide');
  }

  private setTempClientData(data: any) {
    this._tempClientList = new Array<User>();
    if( data && data.length > 0){
      for( let responseData of data){
        let user: User = new User();
        user.setDataFromResponse( responseData);
        this._tempClientList.push( user);
      }
    }
  }

  private findCountCaseByUserList() {
    this._http.post( this._urlService.countCaseByUserList, this._tempClientList, { headers: this._urlService.headerJson})
      .subscribe( data => this.afterCountCaseFind( data), (err :HttpErrorResponse)=> this._errService.reportError( err, this._tempClientList));
  }

  private afterCountCaseFind( data: any) {
    this.setCountCaseListData( data);
    this.setClientList();
  }

  private getCountMainCase( index: number): string{
    if( this._countCaseList[ index]){
      return this._countCaseList[ index].getCountMainCase() + "";
    }
    return "-";
  }

  private getCountDependentCase( index: number){
    if( this._countCaseList[ index]) {
      return this._countCaseList[index].getCountDependentCase() + "";
    }
    return "-";
  }

  private setClientList() {
    if( this._tempClientList.length > 0){
      this._clientList = this._tempClientList;
      this._isDataExist = true;
    }else{
      this._isDataExist = false;
    }
  }

  private setCountCaseListData(data: any) {
    this._countCaseList = new Array<CountCaseDto>();
    if( data && data.length > 0){
      for( let responseData of data){
        let countCaseDto: CountCaseDto = new CountCaseDto();
        countCaseDto.setDataFromResponse( responseData);
        this._countCaseList.push( countCaseDto);
      }
    }
  }
}
