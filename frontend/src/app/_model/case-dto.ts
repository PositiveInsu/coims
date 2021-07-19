import {CaseType} from "./case-type";
import {CaseFee} from "./case-fee";
import {CaseDocument} from "./case-document";
import {User} from "./user";
import {CaseStatus} from "./case-status";
/**
 * Created by Joinsu on 2018-12-17.
 */
export class NewCaseDto{

  private id: number;
  private caseType: CaseType;
  private caseFee: CaseFee = new CaseFee();
  private documentList: Array<CaseDocument>;
  private caseGrade: string;
  private companyId: number;
  private caseNo: string;

  // User
  private user: User = new User();

  getId(): number {
    return this.id;
  }

  setId(value: number) {
    this.id = value;
  }

  getCaseType(): CaseType {
    return this.caseType;
  }

  setCaseType(value: CaseType) {
    this.caseType = value;
  }

  getCaseFee(): CaseFee {
    return this.caseFee;
  }

  setCaseFee(value: CaseFee) {
    this.caseFee = value;
  }

  getDocumentList(): Array<CaseDocument> {
    return this.documentList;
  }

  setDocumentList(value: Array<CaseDocument>) {
    this.documentList = value;
  }

  getCaseGrade(): string {
    return this.caseGrade;
  }

  setCaseGrade(value: string) {
    this.caseGrade = value;
  }

  getUser(): User {
    return this.user;
  }

  setUser(value: User) {
    this.user = value;
  }

  getCompanyId(): number {
    return this.companyId;
  }

  setCompanyId(value: number) {
    this.companyId = value;
  }

  getCaseNo(): string {
    return this.caseNo;
  }

  setCaseNo(value: string) {
    this.caseNo = value;
  }
}

export class CountCaseDto{
  private userId: number;
  private countMainCase: number;
  private countDependentCase: number;

  getUserId(): number {
    return this.userId;
  }

  setUserId(value: number) {
    this.userId = value;
  }

  getCountMainCase(): number {
    return this.countMainCase;
  }

  setCountMainCase(value: number) {
    this.countMainCase = value;
  }

  getCountDependentCase(): number {
    return this.countDependentCase;
  }

  setCountDependentCase(value: number) {
    this.countDependentCase = value;
  }

  setDataFromResponse(responseData: any){
    this.setUserId( responseData.userId);
    this.setCountMainCase( responseData.countMainCase);
    this.setCountDependentCase( responseData.countDependentCase);
  }
}

export class ListCaseDto {
  private id: number;
  private caseTypeId: number;
  private caseTypeCode: string;
  private caseStatus: string;
  private clientFName: string;
  private clientLName: string;
  private clientId: number;
  private companyId: number;
  private caseNo: string;
  private caseGrade: string;
  private uciNo: string;
  private fileNo: string;
  private payStatus: string;
  private result: string;
  private clientBirthDate: Date;
  private createdDate: Date;
  private appliedDate: Date;
  private fileNoDate: Date;
  private resultDate: Date;

  getId(): number {
    return this.id;
  }

  setId(value: number) {
    this.id = value;
  }

  getCaseTypeId(): number {
    return this.caseTypeId;
  }

  setCaseTypeId(value: number) {
    this.caseTypeId = value;
  }

  getCaseTypeCode(): string {
    return this.caseTypeCode;
  }

  setCaseTypeCode(value: string) {
    this.caseTypeCode = value;
  }

  getCaseStatus(): string {
    return this.caseStatus;
  }

  setCaseStatus(value: string) {
    this.caseStatus = value;
  }

  getCompanyId(): number {
    return this.companyId;
  }

  setCompanyId(value: number) {
    this.companyId = value;
  }

  getCaseNo(): string {
    return this.caseNo;
  }

  setCaseNo(value: string) {
    this.caseNo = value;
  }

  getCaseGrade(): string {
    return this.caseGrade;
  }

  setCaseGrade(value: string) {
    this.caseGrade = value;
  }

  getUciNo(): string {
    return this.uciNo;
  }

  setUciNo(value: string) {
    this.uciNo = value;
  }

  getFileNo(): string {
    return this.fileNo;
  }

  setFileNo(value: string) {
    this.fileNo = value;
  }

  getPayStatus(): string {
    return this.payStatus;
  }

  setPayStatus(value: string) {
    this.payStatus = value;
  }

  getResult(): string {
    return this.result;
  }

  setResult(value: string) {
    this.result = value;
  }

  getClientBirthDate(): Date {
    return this.clientBirthDate;
  }

  setClientBirthDate(value: Date) {
    this.clientBirthDate = value;
  }

  getCreatedDate(): Date {
    return this.createdDate;
  }

  setCreatedDate(value: Date) {
    this.createdDate = value;
  }

  getAppliedDate(): Date {
    return this.appliedDate;
  }

  setAppliedDate(value: Date) {
    this.appliedDate = value;
  }

  getFileNoDate(): Date {
    return this.fileNoDate;
  }

  setFileNoDate(value: Date) {
    this.fileNoDate = value;
  }

  getResultDate(): Date {
    return this.resultDate;
  }

  setResultDate(value: Date) {
    this.resultDate = value;
  }

  getClientFName(): string {
    return this.clientFName;
  }

  setClientFName(value: string) {
    this.clientFName = value;
  }

  getClientLName(): string {
    return this.clientLName;
  }

  setClientLName(value: string) {
    this.clientLName = value;
  }

  getClientId(): number {
    return this.clientId;
  }

  setClientId(value: number) {
    this.clientId = value;
  }

  setDataFromResponse(responseData: any){
    this.setId( responseData.id);
    this.setCaseNo( responseData.caseNo);
    this.setCaseTypeId( responseData.caseType.id);
    this.setCaseTypeCode( responseData.caseType.code);
    this.setCaseStatus( responseData.caseStatus ? responseData.caseStatus.name : null);
    this.setCreatedDate( new Date( responseData.createdDate));
    this.setFileNo( responseData.fileNo);
    this.setFileNoDate( responseData.fileNoDate ? new Date( responseData.fileNoDate) : null);
    this.setPayStatus( responseData.payStatus);
    this.setResult( responseData.result);
    this.setResultDate( responseData.resultDate ? new Date(responseData.resultDate) : null);
    this.setUciNo( responseData.uciNo);
    this.setClientBirthDate( responseData.user.birthDate ? new Date(responseData.user.birthDate) : null);
    this.setAppliedDate( responseData.user.appliedDate ? new Date(responseData.user.appliedDate) : null);
    this.setClientFName( responseData.user.fName);
    this.setClientLName( responseData.user.lName);
    this.setClientId( responseData.user.id);
  }
}

export class DetailCaseDto {
  private _id: number;

  private _caseGrade: string;
  private _caseNo: string;
  private _fileNo: string;
  private _uciNo: number;
  private _payStatus: string;
  private _result: string;

  private _createdDate: Date;
  private _appliedDate: Date;
  private _fileNoDate: Date;
  private _resultDate: Date;

  private _user: User;
  private _caseFee: CaseFee;
  private _caseStatus: CaseStatus;
  private _caseType: CaseType;

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get caseGrade(): string {
    return this._caseGrade;
  }

  set caseGrade(value: string) {
    this._caseGrade = value;
  }

  get caseNo(): string {
    return this._caseNo;
  }

  set caseNo(value: string) {
    this._caseNo = value;
  }

  get fileNo(): string {
    return this._fileNo;
  }

  set fileNo(value: string) {
    this._fileNo = value;
  }

  get payStatus(): string {
    return this._payStatus;
  }

  set payStatus(value: string) {
    this._payStatus = value;
  }

  get result(): string {
    return this._result;
  }

  set result(value: string) {
    this._result = value;
  }

  get uciNo(): number {
    return this._uciNo;
  }

  set uciNo(value: number) {
    this._uciNo = value;
  }

  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }

  get caseFee(): CaseFee {
    return this._caseFee;
  }

  set caseFee(value: CaseFee) {
    this._caseFee = value;
  }

  get caseStatus(): CaseStatus {
    return this._caseStatus;
  }

  set caseStatus(value: CaseStatus) {
    this._caseStatus = value;
  }

  get caseType(): CaseType {
    return this._caseType;
  }

  set caseType(value: CaseType) {
    this._caseType = value;
  }

  get createdDate(): Date {
    return this._createdDate;
  }

  set createdDate(value: Date) {
    this._createdDate = value;
  }

  get appliedDate(): Date {
    return this._appliedDate;
  }

  set appliedDate(value: Date) {
    this._appliedDate = value;
  }

  get fileNoDate(): Date {
    return this._fileNoDate;
  }

  set fileNoDate(value: Date) {
    this._fileNoDate = value;
  }

  get resultDate(): Date {
    return this._resultDate;
  }

  set resultDate(value: Date) {
    this._resultDate = value;
  }

  setDataFromResponse(responseData: any){
    this.id = responseData.id;
    this.caseGrade = responseData.caseGrade;
    this.caseNo = responseData.caseNo;
    this.fileNo = responseData.fileNo;
    this.uciNo = responseData.uciNo;
    this.payStatus = responseData.payStatus;
    this.result = responseData.result;

    this.createdDate = this.getDateObj( responseData.createdDate);
    this.appliedDate = this.getDateObj( responseData.appliedDate);
    this.fileNoDate = this.getDateObj( responseData.fileNoDate);
    this.resultDate = this.getDateObj( responseData.resultDate);

    let caseFee: CaseFee = new CaseFee();
    caseFee.setDataFromResponse( responseData.caseFee);
    this.caseFee = caseFee;

    let caseStatus: CaseStatus = new CaseStatus();
    caseStatus.setDataFromResponse( responseData.caseStatus);
    this.caseStatus = caseStatus;

    let caseType: CaseType = new CaseType();
    caseType.setDataFromResponse( responseData.caseType);
    this.caseType = caseType;

    let user: User = new User();
    user.setDataFromResponse( responseData.user);
    this.user = user;
  }

  private getDateObj( date: string) {
    if( date){
      return new Date( date);
    }
    return null;
  }
}
