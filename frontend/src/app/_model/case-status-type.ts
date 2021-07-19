/**
 * Created by Joinsu on 2019-04-30.
 */
export class CaseStatusType{
  // CaseStatusType.java
  private _COMMON: string = "COMMON";
  private _EOI: string = "EOI";
  private _PNP: string = "PNP";
  private _FEDERAL: string = "FEDERAL";

  get COMMON(): string {
    return this._COMMON;
  }

  get EOI(): string {
    return this._EOI;
  }

  get PNP(): string {
    return this._PNP;
  }

  get FEDERAL(): string {
    return this._FEDERAL;
  }

  getCaseStatusTypeList(): Array<string>{
    let caseStatusTypeList: Array<string> = new Array<string>();
    caseStatusTypeList.push( this.COMMON);
    caseStatusTypeList.push( this.EOI);
    caseStatusTypeList.push( this.PNP);
    caseStatusTypeList.push( this.FEDERAL);
    return caseStatusTypeList;
  }
}
