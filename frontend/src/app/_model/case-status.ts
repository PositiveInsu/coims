/**
 * Created by Joinsu on 2019-04-30.
 */
export class CaseStatus{
  private id: number;
  private stepNo: number;
  private name: string;
  private caseStatusType: string;

  getId(): number {
    return this.id;
  }

  setId(value: number) {
    this.id = value;
  }

  getStepNo(): number {
    return this.stepNo;
  }

  setStepNo(value: number) {
    this.stepNo = value;
  }

  getName(): string {
    return this.name;
  }

  setName(value: string) {
    this.name = value;
  }

  getCaseStatusType(): string {
    return this.caseStatusType;
  }

  setCaseStatusType(value: string) {
    this.caseStatusType = value;
  }

  setDataFromResponse(responseData: any){
    this.setId( responseData.id);
    this.setStepNo( responseData.stepNo);
    this.setName( responseData.name);
    this.setCaseStatusType( responseData.caseStatusType);
  }
}

export class CaseStatusCategory{
  public COMMON : Array<CaseStatus> = new Array();
  public EOI : Array<CaseStatus> = new Array();
  public PNP : Array<CaseStatus> = new Array();
  public FEDERAL : Array<CaseStatus> = new Array();
}







