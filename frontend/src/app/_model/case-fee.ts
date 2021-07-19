/**
 * Created by Joinsu on 2018-12-17.
 */
export class CaseFee{

  private id: number;
  private basic: number;
  private discount: number;
  private extra: number;
  private note: string;
  private subTotal: number;
  private tax: number;
  private processing: number;
  private government: number;
  private other1: number;
  private otherNote1: string;
  private other2: number;
  private otherNote2: string;
  private other3: number;
  private otherNote3: string;
  private clientCase: string;
  private _otherFeeList: Array<OtherFee>;

  initOtherFeeList(){
    this._otherFeeList = new Array<OtherFee>();
    this._otherFeeList.push( new OtherFee( 0, this.getOther1(), this.getOtherNote1()));
    this._otherFeeList.push( new OtherFee( 1, this.getOther2(), this.getOtherNote2()));
    this._otherFeeList.push( new OtherFee( 2, this.getOther3(), this.getOtherNote3()));
  }

  getId(): number {
    return this.id;
  }

  setId(value: number) {
    this.id = value;
  }

  getBasic(): number {
    return this.basic;
  }

  setBasic(value: number) {
    this.basic = value;
  }

  getDiscount(): number {
    return this.discount;
  }

  setDiscount(value: number) {
    this.discount = value;
  }

  getExtra(): number {
    return this.extra;
  }

  setExtra(value: number) {
    this.extra = value;
  }

  getNote(): string {
    return this.note;
  }

  setNote(value: string) {
    this.note = value;
  }

  getSubTotal(): number {
    return this.subTotal;
  }

  setSubTotal(value: number) {
    this.subTotal = value;
  }

  getTax(): number {
    return this.tax;
  }

  setTax(value: number) {
    this.tax = value;
  }

  getProcessing(): number {
    return this.processing;
  }

  setProcessing(value: number) {
    this.processing = value;
  }

  getGovernment(): number {
    return this.government;
  }

  setGovernment(value: number) {
    this.government = value;
  }

  getOther1(): number {
    return this.other1;
  }

  setOther1(value: number) {
    this.other1 = value;
  }

  getOtherNote1(): string {
    return this.otherNote1;
  }

  setOtherNote1(value: string) {
    this.otherNote1 = value;
  }

  getOther2(): number {
    return this.other2;
  }

  setOther2(value: number) {
    this.other2 = value;
  }

  getOtherNote2(): string {
    return this.otherNote2;
  }

  setOtherNote2(value: string) {
    this.otherNote2 = value;
  }

  getOther3(): number {
    return this.other3;
  }

  setOther3(value: number) {
    this.other3 = value;
  }

  getOtherNote3(): string {
    return this.otherNote3;
  }

  setOtherNote3(value: string) {
    this.otherNote3 = value;
  }

  getClientCase(): string {
    return this.clientCase;
  }

  setClientCase(value: string) {
    this.clientCase = value;
  }

  get otherFeeList(): Array<OtherFee> {
    return this._otherFeeList;
  }

  setDataFromResponse(responseData: any){
    this.setId( responseData.id);
    this.setBasic( responseData.basic)
    this.setDiscount( responseData.discount)
    this.setExtra( responseData.extra)
    this.setNote( responseData.note);
    this.setSubTotal( responseData.subTotal);
    this.setTax( responseData.tax);
    this.setProcessing( responseData.processing);
    this.setGovernment( responseData.government);
    this.setOther1( responseData.other1);
    this.setOtherNote1( responseData.otherNote1);
    this.setOther2( responseData.other2);
    this.setOtherNote2( responseData.otherNote2);
    this.setOther3( responseData.other3);
    this.setOtherNote3( responseData.otherNote3);
    this.setClientCase( responseData.clientCase)
  }

  public getTaxPercentage(): number{
    if( this.getTax() && this.getTax() !== 0){
      return (this.getTax()/this.getSubTotal()) * 100;
    }
    return 0;
  }

  public getTotal(): number{
    return this.getSubTotal() + this.getTax();
  }
}

export class OtherFee{
  private _no: number;
  private _fee: number;
  private _note: string;

  constructor( no: number, fee: number, note: string) {
    this._no = no;
    this._fee = fee;
    this._note = note;
  }

  get no(): number {
    return this._no;
  }

  set no(value: number) {
    this._no = value;
  }

  get fee(): number {
    return this._fee;
  }

  set fee(value: number) {
    this._fee = value;
  }

  get note(): string {
    return this._note;
  }

  set note(value: string) {
    this._note = value;
  }
}
