/**
 * Created by Joinsu on 2017-05-12.
 */
export class Company{
  private id: number;
  private name: string;
  private country: string;
  private street: string;
  private city: string;
  private province: string;
  private postal: string;
  private phone: string;
  private email: string;
  private website: string;
  private fax: string;
  private gstNo: string;

  getId(): number {
    return this.id;
  }

  setId( value: number) {
    this.id = value;
  }

  getName(): string {
    return this.name;
  }

  setName(value: string) {
    this.name = value;
  }

  getCountry(): string {
    return this.country;
  }

  setCountry(value: string) {
    this.country = value;
  }

  getStreet(): string {
    return this.street;
  }

  setStreet(value: string) {
    this.street = value;
  }

  getCity(): string {
    return this.city;
  }

  setCity(value: string) {
    this.city = value;
  }

  getProvince(): string {
    return this.province;
  }

  setProvince(value: string) {
    this.province = value;
  }

  getPostal(): string {
    return this.postal;
  }

  setPostal(value: string) {
    this.postal = value;
  }

  getPhone(): string {
    return this.phone;
  }

  setPhone(value: string) {
    this.phone = value;
  }

  getEmail(): string {
    return this.email;
  }

  setEmail(value: string) {
    this.email = value;
  }

  getWebsite(): string {
    return this.website;
  }

  setWebsite(value: string) {
    this.website = value;
  }

  getFax(): string {
    return this.fax;
  }

  setFax(value: string) {
    this.fax = value;
  }

  getGstNo(): string {
    return this.gstNo;
  }

  setGstNo(value: string) {
    this.gstNo = value;
  }

  get fullAddress(){
    let space:string = ', ';
    return this.street + space + this.city + space + this.province + space + this.country + ' ' + this.postal;
  }

  setDataFromResponse(responseData: any){
    this.setId( responseData.id);
    this.setName( responseData.name);
    this.setCountry( responseData.country);
    this.setProvince( responseData.province);
    this.setCity( responseData.city);
    this.setStreet( responseData.street);
    this.setPostal( responseData.postal);
    this.setPhone( responseData.phone);
    this.setFax( responseData.fax);
    this.setEmail( responseData.email);
    this.setWebsite( responseData.website);
    this.setGstNo( responseData.gstNo);
  }
}
