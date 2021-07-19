import {CaseDocument} from "./case-document";
/**
 * Created by Joinsu on 2018-09-12.
 */
export class CaseType{
  private id: number;
  private pid: number;
  private name: string;
  private category: string;
  private code: string;
  private companyId: number;
  private hasChild: boolean;
  private fee: number;
  private governmentFee: number;
  private caseTypeFeeId: number;
  private documentList: Array<CaseDocument>;
  private _chlidCaseTypeList: Array<CaseType>;

  getId(): number {
    return this.id;
  }

  setId(value: number) {
    this.id = value;
  }

  getName(): string {
    return this.name;
  }

  setName(value: string) {
    this.name = value;
  }

  getCategory(): string {
    return this.category;
  }

  setCategory(value: string) {
    this.category = value;
  }

  getCode(): string {
    return this.code;
  }

  setCode(value: string) {
    this.code = value;
  }

  getCompanyId(): number {
    return this.companyId;
  }

  setCompanyId(value: number) {
    this.companyId = value;
  }

  getPid(): number {
    return this.pid;
  }

  setPid(value: number) {
    this.pid = value;
  }

  getHasChild(): boolean {
    return this.hasChild;
  }

  setHasChild(value: boolean) {
    this.hasChild = value;
  }

  getFee(): number {
    return this.fee;
  }

  setFee(value: number) {
    this.fee = value;
  }

  getCaseTypeFeeId(): number {
    return this.caseTypeFeeId;
  }

  setCaseTypeFeeId(value: number) {
    this.caseTypeFeeId = value;
  }

  getDocumentList(): Array<CaseDocument> {
    return this.documentList;
  }

  setDocumentList(value: Array<CaseDocument>) {
    this.documentList = value;
  }

  getGovernmentFee(): number {
    return this.governmentFee;
  }

  setGovernmentFee(value: number) {
    this.governmentFee = value;
  }

  get chlidCaseTypeList(): Array<CaseType> {
    return this._chlidCaseTypeList;
  }

  set chlidCaseTypeList(value: Array<CaseType>) {
    this._chlidCaseTypeList = value;
  }

  public setDataFromResponse(responseData: any): void{
    this.setId( responseData.id);
    this.setPid( responseData.pid);
    this.setName( responseData.name);
    this.setCategory( responseData.category);
    this.setCode( responseData.code);
    this.setCompanyId( responseData.companyId);
    this.setHasChild( responseData.hasChild);
    this.setFee( responseData.fee);
    this.setGovernmentFee( responseData.governmentFee);
    this.setCaseTypeFeeId( responseData.caseTypeFeeId);
    this.setDocumentList( this.getDocument( responseData.documentList));
    if( this.getHasChild()){
      this._chlidCaseTypeList = new Array<CaseType>();
    }
  }

  private getDocument( foundDocumentList: any): Array<CaseDocument> {
    if( !foundDocumentList){
      return null;
    }
    let documentList:Array<CaseDocument> = new Array<CaseDocument>();
    if( foundDocumentList.length > 0){
      for( let value of foundDocumentList){
        let caseTypeDocument: CaseDocument = new CaseDocument();
        caseTypeDocument.setDataFromResponse( value);
        documentList.push( caseTypeDocument);
      }
      return documentList;
    }else{
      return documentList;
    }
  }

  public isExistChild(): boolean{
    if( this.chlidCaseTypeList && this.chlidCaseTypeList.length > 0){
      return true;
    }
    return false;
  }
}

export class CaseTypeCategory{
  public VISA : Array<CaseType> = new Array();
  public IMMIGRATION : Array<CaseType> = new Array();
  public PNP : Array<CaseType> = new Array();
  public OTHER : Array<CaseType> = new Array();
  public SPECIAL : Array<CaseType> = new Array();
}
