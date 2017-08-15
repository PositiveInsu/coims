/**
 * Created by Joinsu on 2017-05-12.
 */
export class Company{
  private _name: string;
  private _country: string;
  private _street: string;
  private _city: string;
  private _province: string;
  private _postal: string;
  private _phone: string;
  private _email: string;
  private _website: string;
  private _fax: string;

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get country(): string {
    return this._country;
  }

  set country(value: string) {
    this._country = value;
  }

  get street(): string {
    return this._street;
  }

  set street(value: string) {
    this._street = value;
  }

  get city(): string {
    return this._city;
  }

  set city(value: string) {
    this._city = value;
  }

  get province(): string {
    return this._province;
  }

  set province(value: string) {
    this._province = value;
  }

  get postal(): string {
    return this._postal;
  }

  set postal(value: string) {
    this._postal = value;
  }

  get phone(): string {
    return this._phone;
  }

  set phone(value: string) {
    this._phone = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get website(): string {
    return this._website;
  }

  set website(value: string) {
    this._website = value;
  }

  get fax(): string {
    return this._fax;
  }

  set fax(value: string) {
    this._fax = value;
  }

  get fullAddress(){
    let space:string = ', ';
    return this._street + space + this._city + space + this._province + space + this._country + ' ' + this._postal;
  }
}
