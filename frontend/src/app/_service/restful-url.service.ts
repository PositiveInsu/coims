import {Injectable} from "@angular/core";
import {HttpHeaders} from "@angular/common/http";
import {ResponseContentType} from "@angular/http";
/**
 * Created by Joinsu on 2018-08-14.
 */
@Injectable()
export class RestfulUrlService{

  private _login:string                       = '/public/login-user';
  private _consultantSubmit: string           = '/public/add-consultant';
  private _isDuplicateUser: string            = '/public/is-duplicate-user';
  private _isDuplicateMemberID: string        = '/public/is-duplicate-member-id';
  private _isAuthenticatedUserApi: string     = '/public/is-authenticated-user';

  private _findUser: string                   = '/user/find-user';
  private _findStaffUsersByCompanyId: string  = '/user/find-staff-users-by-company-id';
  private _addStaff: string                   = '/user/add-staff';
  private _modifyUser: string                 = '/user/modify-user';
  private _findClientUser: string             = '/user/find-client-user';
  private _modifyClient: string               = '/user/modify-client';
  private _isExistClientName: string          = '/user/is-exist-client-name';

  private _modifyCompany: string              = '/company/modify-company';

  private _findCaseType: string               = '/case-type/find';
  private _findCaseTypeList: string           = '/case-type/find-list';
  private _modifyCaseFee: string              = '/case-type/modify-fee-by-list';
  private _modifyGovernmentFee: string        = '/case-type/modify-gov-fee-by-list';
  private _caseTypeFeeExcel: string           = '/case-type/fee-excel';
  private _addCaseTypeDocument: string        = '/case-type/modify-additional-doc';
  private _deleteCaseTypeDocument: string     = '/case-type/delete-additional-doc'
  private _caseTypeDocumentListExcel: string  = '/case-type/down-doc-list';

  private _addDocument: string                = '/document/add';
  private _addMoreDocument: string            = '/document/add-more';
  private _deleteDocReturnDocList: string     = '/document/delete-and-return-doc-list';
  private _modifyDocument : string            = '/document/modify';
  private _findDefaultDocumentList: string    = '/document/find-default-list';
  private _findCaseDocumentList: string       = '/document/find-list';
  private _findDocumentByDocCode: string      = '/document/find-by-doc-code';

  private _findCaseDocFileName: string        = '/storage/find-case-doc-name';
  private _downDocFile: string                = '/storage/down-doc-file';
  private _deleteDocFile: string              = '/storage/delete-doc-file';
  private _uploadCaseDocFile: string          = '/storage/upload-doc-file';

  private _findCaseTypeFee: string            = '/case-type-fee/find';
  private _findCaseTypeFeeList: string        = '/case-type-fee/find-list';

  private _addClientCase: string              = '/client-case/add';
  private _countCaseByUserList: string        = '/client-case/count-by-user-list';
  private _findCaseList: string               = '/client-case/find-list';
  private _findCaseListByCaseNo: string       = '/client-case/find-list-by-case-no';
  private _findAllCaseYear: string            = '/client-case/find-all-year';
  private _changeNextCaseStatus: string       = '/client-case/change-next-case-status';
  private _downCaseInvoice: string            = '/client-case/down-invoice';
  private _downCaseReceipt: string            = '/client-case/down-receipt';

  private _findAllCaseStatus: string          = '/case-status/find-all';
  private _findAllCaseStatusByType: string    = '/case-status/find-all-by-type';

  private _findAllClientCaseStatusById: string = '/client-case-status/find-list-by-case-id';


  get headerTextPlain(): HttpHeaders{
    return new HttpHeaders({ "Content-Type" : "text/plain"});
  }

  get headerJson(): HttpHeaders{
    return new HttpHeaders({"Content-Type": "application/json"});
  }

  get headerStream(): HttpHeaders{
    return new HttpHeaders({"Content-Type": "application/octet-stream"});
  }

  get findUser(): string {
    return this._findUser;
  }

  get findStaffUsersByCompanyId(): string {
    return this._findStaffUsersByCompanyId;
  }

  get login(): string {
    return this._login;
  }

  get consultantSubmit(): string {
    return this._consultantSubmit;
  }

  get isDuplicateUser(): string {
    return this._isDuplicateUser;
  }

  get isDuplicateMemberID(): string {
    return this._isDuplicateMemberID;
  }

  get isAuthenticatedUserApi(): string {
    return this._isAuthenticatedUserApi;
  }

  get addStaff(): string {
    return this._addStaff;
  }

  get modifyUser(): string {
    return this._modifyUser;
  }

  get modifyCompany(): string {
    return this._modifyCompany;
  }

  get findCaseType(): string {
    return this._findCaseType;
  }

  get findCaseTypeList(): string {
    return this._findCaseTypeList;
  }

  get modifyCaseFee(): string {
    return this._modifyCaseFee;
  }

  get caseTypeFeeExcel(): string {
    return this._caseTypeFeeExcel;
  }

  get addDocument(): string {
    return this._addDocument;
  }

  get findCaseDocumentList(): string {
    return this._findCaseDocumentList;
  }

  get findDefaultDocumentList(): string {
    return this._findDefaultDocumentList;
  }

  get deleteDocReturnDocList(): string {
    return this._deleteDocReturnDocList;
  }

  get modifyDocument(): string {
    return this._modifyDocument;
  }

  get findCaseTypeFee(): string {
    return this._findCaseTypeFee;
  }

  get findCaseTypeFeeList(): string {
    return this._findCaseTypeFeeList;
  }

  get addCaseTypeDocument(): string {
    return this._addCaseTypeDocument;
  }

  get deleteCaseTypeDocument(): string {
    return this._deleteCaseTypeDocument;
  }

  get caseTypeDocumentListExcel(): string {
    return this._caseTypeDocumentListExcel;
  }

  get findClientUser(): string {
    return this._findClientUser;
  }

  get modifyGovernmentFee(): string {
    return this._modifyGovernmentFee;
  }

  get addMoreDocument(): string {
    return this._addMoreDocument;
  }

  get addClientCase(): string {
    return this._addClientCase;
  }

  get countCaseByUserList(): string {
    return this._countCaseByUserList;
  }

  get findCaseList(): string {
    return this._findCaseList;
  }

  get findAllCaseStatus(): string {
    return this._findAllCaseStatus;
  }

  get findAllCaseYear(): string {
    return this._findAllCaseYear;
  }

  get findCaseListByCaseNo(): string {
    return this._findCaseListByCaseNo;
  }

  get findAllCaseStatusByType(): string {
    return this._findAllCaseStatusByType;
  }

  get uploadCaseDocFile(): string {
    return this._uploadCaseDocFile;
  }

  get findCaseDocFileName(): string {
    return this._findCaseDocFileName;
  }

  get downDocFile(): string {
    return this._downDocFile;
  }

  get findDocumentByDocCode(): string {
    return this._findDocumentByDocCode;
  }

  get deleteDocFile(): string {
    return this._deleteDocFile;
  }

  get changeNextCaseStatus(): string {
    return this._changeNextCaseStatus;
  }

  get downCaseInvoice(): string {
    return this._downCaseInvoice;
  }

  get downCaseReceipt(): string {
    return this._downCaseReceipt;
  }

  get findAllClientCaseStatusById(): string {
    return this._findAllClientCaseStatusById;
  }

  get modifyClient(): string {
    return this._modifyClient;
  }

  get isExistClientName(): string {
    return this._isExistClientName;
  }
}
