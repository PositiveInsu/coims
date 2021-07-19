import {CaseDocumentType} from "./case-document-type";
/**
 * Created by Joinsu on 2018-09-27.
 */
export class CaseDocument{
  private id: number;
  private name: string;
  private code: string;
  private category: string;
  private companyId: number;

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

  getCode(): string {
    return this.code;
  }

  setCode(value: string) {
    this.code = value;
  }

  getCategory(): string {
    return this.category;
  }

  setCategory(value: string) {
    this.category = value;
  }

  getCompanyId(): number {
    return this.companyId;
  }

  setCompanyId(value: number) {
    this.companyId = value;
  }

  setDataFromResponse(responseData: any){
    this.setId( responseData.id);
    this.setName( responseData.name);
    this.setCode( responseData.code);
    this.setCategory( responseData.category);
    this.setCompanyId( responseData.companyId);
  }

}

export class DocumentCategoryFactory{

  private _categoryTypeObj: CaseDocumentType = new CaseDocumentType();
  private _categoryKeyList: Array<string>;

  constructor() {
    this._categoryKeyList = new Array();
    for( let key of Object.keys( this._categoryTypeObj)){
      this._categoryKeyList.push( this._categoryTypeObj[key]);
    }
  }

  public getCategoryObj():{[key:string]: Array<CaseDocument>}{
    let _documentCategory: {[key:string]: Array<CaseDocument>} = {};
    for( let key of this._categoryKeyList){
      _documentCategory[ this._categoryTypeObj[key]] = new Array<CaseDocument>();
    }
    return _documentCategory;
  }

  get categoryTypeObj(): CaseDocumentType {
    return this._categoryTypeObj;
  }

  get categoryKeyList(): Array<string> {
    return this._categoryKeyList;
  }
}
