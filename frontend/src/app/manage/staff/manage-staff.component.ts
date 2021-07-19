import {Component, OnInit, ViewChild} from "@angular/core";
import {CommonService} from "../../_service/common.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ErrorService} from "../../_service/error.service";
import {PageDto, Sort} from "../../_model/page-dto";
import {AppConfig} from "../../app.config";
import {ManageStaffModalComponent} from "./manage-staff-modal.component";
import {ModalType} from "../../_model/modal-type";
import {MainService} from "../../_service/main.service";
import {MainComponent} from "../../main/main.component";
import {HttpClient} from "@angular/common/http";
import {RestfulUrlService} from "../../_service/restful-url.service";
declare var $ :any;

/**
 * Created by Joinsu on 2018-08-03.
 */

@Component({
  selector:'coims-manage-staff',
  templateUrl: './manage-staff.component.html',
  providers: []
})
export class ManageStaffComponent implements OnInit{

  private _staffList: Array<Object>;
  private _pageInfo: PageDto;
  private _companyId: number;
  private _modalType: ModalType;
  @ViewChild( ManageStaffModalComponent) private _child: ManageStaffModalComponent;

  constructor( private _commonService: CommonService,
               private _mainService: MainService,
               private _errorService: ErrorService,
               private _appConfig: AppConfig,
               private _parent: MainComponent,
               private _http: HttpClient,
               private _urlService: RestfulUrlService
  ){}

  ngOnInit(): void {
    this._mainService.changeMenu( this._mainService.leftMenuFactory.STAFF);
    this._companyId = this._commonService.user.getCompany().getId();
    this.initStaffList();
    this._parent.detectChanges();
  }

  private initStaffList() {
    let sortList: Array<Sort> = new Array<Sort>();
    sortList.push( new Sort().targetWithASC( "type"));
    sortList.push( new Sort().targetWithDESC( "createdDate"));

    this._pageInfo = new PageDto(0, this._appConfig.staffPageSize, sortList);
    this._modalType = new ModalType();
    this.getStaffListByCompanyId( this._pageInfo);
  }

  private getStaffListByCompanyId( _pageInfo: PageDto) {
    this._http.post( this._urlService.findStaffUsersByCompanyId, { companyId: this._companyId, pageRequest: _pageInfo}, { headers: this._urlService.headerJson})
      .subscribe(data => { this.setupData( data)},
        (error: HttpErrorResponse) => { this._errorService.reportError( error, this._companyId)});
  }

  private setupData( res: any) {
    this._staffList = res.content;
    this._pageInfo.setTotalPage( res.totalPage);
  }

  getPhoneNo( staff: Object): string{
    let phoneNo = "Please Provide Your Contact Number.";
    if( staff['phoneNo']){
      phoneNo = staff['phoneNo'];
    }
    return phoneNo;
  }

  count( totalNumber: number){
    return new Array( totalNumber);
  }

  changePage( pageNumber: number){
    this._pageInfo.setPage( pageNumber);
    this.getStaffListByCompanyId( this._pageInfo);
  }

  refreshData(){
    this.getStaffListByCompanyId( this._pageInfo);
  }

  openModal(){
    this._child.callAddStaffModal();
  }

  modalOpenWithData( staff: any){
    $( '#modalAddstaff').modal( 'show');
    this._child.callModifyStaffModal( staff);
  }
}
