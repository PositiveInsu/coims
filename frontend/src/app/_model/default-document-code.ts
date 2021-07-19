/**
 * Created by Joinsu on 2019-05-08.
 */
export class DefaultDocumentCode{
  private _AGREEMENT: string = "AGREE";
  private _COMPANY_RECEIPT: string = "CRCPT";

  get AGREEMENT(): string {
    return this._AGREEMENT;
  }

  get COMPANY_RECEIPT(): string {
    return this._COMPANY_RECEIPT;
  }
}
