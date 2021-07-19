/**
 * Created by Joinsu on 2018-08-02.
 */
export class RoleType{
  private _ADMIN: string = "ADMIN";
  private _MANAGER: string = "MANAGER";
  private _STAFF: string = "STAFF";
  private _USER: string = "USER";

  get ADMIN(): string {
    return this._ADMIN;
  }

  get MANAGER(): string {
    return this._MANAGER;
  }

  get STAFF(): string {
    return this._STAFF;
  }

  get USER(): string {
    return this._USER;
  }
}
