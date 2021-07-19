/**
 * Created by Joinsu on 2018-08-15.
 */
export class UserType{
  private _BOSS: string = "BOSS";
  private _MANAGER: string = "MANAGER";
  private _STAFF: string = "STAFF";
  private _CLIENT: string = "CLIENT";
  private _DEPENDENT: string = "DEPENDENT";

  get BOSS() {
    return this._BOSS;
  }

  get MANAGER() {
    return this._MANAGER;
  }

  get STAFF() {
    return this._STAFF;
  }

  get CLIENT(): string {
    return this._CLIENT;
  }

  get DEPENDENT(): string {
    return this._DEPENDENT;
  }
}
