import {Company} from "./company";
/**
 * Created by Joinsu on 2017-05-12.
 */
export class Consultant{
  private _fname: string;
  private _lname: string;
  private _email: string;
  private _password: string;
  private _company: Company;

  get fname(): string {
    return this._fname;
  }

  set fname(value: string) {
    this._fname = value;
  }

  get lname(): string {
    return this._lname;
  }

  set lname(value: string) {
    this._lname = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get company(): Company {
    return this._company;
  }

  set company(value: Company) {
    this._company = value;
  }
}
