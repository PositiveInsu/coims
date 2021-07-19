import {Company} from "./company";
import {Role} from "./role";
/**
 * Created by Joinsu on 2017-05-12.
 */
export class User{
  private id: number;
  private fName: string;
  private lName: string;
  private email: string;
  private password: string;
  private memberId: string;
  private phoneNo: string;
  private type: string;
  private company: Company;
  private roles: Array<Role>;
  private birthDate: Date;

  private country: string;
  private province: string;
  private city: string;
  private street: string;
  private postal: string;

  getId(): number {
    return this.id;
  }

  setId(value: number) {
    this.id = value;
  }

  getFName(): string{
    return this.fName;
  }

  setFName( value: string){
    this.fName = value;
  }

  getLName(): string{
    return this.lName;
  }

  setLName( value: string){
    this.lName = value;
  }

  getEmail(): string{
    return this.email;
  }

  setEmail( value: string){
    this.email = value;
  }

  setPassword( value: string){
    this.password = value;
  }

  getMemberId(): string{
    return this.memberId;
  }

  setMemberId( value: string){
    this.memberId = value;
  }

  getCompany(): Company{
    return this.company;
  }

  setCompany( value: Company){
    this.company = value;
  }

  getRoles(): Array<Role> {
    return this.roles;
  }

  setRoles(value: Array<Role>) {
    this.roles = value;
  }

  getPhoneNo(): string {
    return this.phoneNo;
  }

  setPhoneNo(value: string) {
    this.phoneNo = value;
  }

  getType(): string {
    return this.type;
  }

  setType(value: string) {
    this.type = value;
  }

  getBirthDate(): Date {
    return this.birthDate;
  }

  setBirthDate(value: Date) {
    this.birthDate = value;
  }

  getCountry(): string {
    return this.country;
  }

  setCountry(value: string) {
    this.country = value;
  }

  getProvince(): string {
    return this.province;
  }

  setProvince(value: string) {
    this.province = value;
  }

  getCity(): string {
    return this.city;
  }

  setCity(value: string) {
    this.city = value;
  }

  getStreet(): string {
    return this.street;
  }

  setStreet(value: string) {
    this.street = value;
  }

  getPostal(): string {
    return this.postal;
  }

  setPostal(value: string) {
    this.postal = value;
  }

  get fullAddress(){
    if( this.country){
      let space:string = ', ';
      return this.street + space + this.city + space + this.province + space + this.country + ' ' + this.postal;
    }
    return undefined;
  }

  setDataFromResponse(responseData: any){
    this.company = this.getCompanyInfo( responseData.company);
    this.setFName( this.getFNameFromResponseData( responseData));
    this.setLName( this.getLNameFromResponseData( responseData));
    this.setEmail( responseData.email);
    this.setMemberId( responseData.memberId);
    this.setRoles( this.getRoleInfo( responseData.roles));
    this.setPhoneNo( responseData.phoneNo);
    this.setType( responseData.type);
    this.setId( responseData.id);
    this.setCountry( responseData.country);
    this.setProvince( responseData.province);
    this.setCity( responseData.city);
    this.setStreet( responseData.street);
    this.setPostal( responseData.postal)
    if( responseData.birthDate){
      this.setBirthDate( new Date( responseData.birthDate));
    }
  }

  private getCompanyInfo( companyValue: any): Company{
    if( !companyValue){
      return;
    }
    let company: Company = new Company();
    company.setDataFromResponse( companyValue);

    return company;
  }

  private getRoleInfo( roleList: Array<any>): Array<Role>{
    if( !roleList){
      return;
    }

    let roles: Array<Role> = new Array<Role>();

    for( let role of roleList){
      roles.push( new Role( role.id, role.role));
    }
    return roles;
  }s

  private getFNameFromResponseData( responseData: any) {
    let value: string = "";
    if( responseData.fName){
      value = responseData.fName;
    }else if( responseData.fname){
      value = responseData.fname;
    }
    return value;
  }

  private getLNameFromResponseData( responseData: any) {
    let value: string = "";
    if( responseData.lName){
      value = responseData.lName;
    }else if( responseData.lname){
      value = responseData.lname;
    }
    return value;
  }
}
