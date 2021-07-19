/**
 * Created by Joinsu on 2018-11-23.
 */
export class CaseTypeFee{
  private id: number;
  private fee: number;
  private caseTypeId: number;

  getId(): number {
    return this.id;
  }

  setId(value: number) {
    this.id = value;
  }

  getFee(): number {
    return this.fee;
  }

  setFee(value: number) {
    this.fee = value;
  }

  getCaseTypeId(): number {
    return this.caseTypeId;
  }

  setCaseTypeId(value: number) {
    this.caseTypeId = value;
  }

  setDataFromResponse( responseData: any){
    this.setId( responseData.id);
    this.setFee( responseData.fee);
    this.setCaseTypeId( responseData.caseTypeId);
  }
}
