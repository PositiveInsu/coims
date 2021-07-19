/**
 * Created by Joinsu on 2018-08-21.
 */
export class ModalType {
  private _ADD: string = "ADD";
  private _MODIFY: string = "MODIFY";

  get ADD(): string {
    return this._ADD;
  }

  set ADD(value: string) {
    this._ADD = value;
  }

  get MODIFY(): string {
    return this._MODIFY;
  }

  set MODIFY(value: string) {
    this._MODIFY = value;
  }
}
