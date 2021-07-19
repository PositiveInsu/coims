import {Injectable} from "@angular/core";
import {User} from "../_model/user";
import {FormControl, AbstractControl} from "@angular/forms";
import {isUndefined} from "ngx-bootstrap/bs-moment/utils/type-checks";
import {CaseType, CaseTypeCategory} from "../_model/case-type";
import {Subject, BehaviorSubject} from "rxjs";
/**
 * Created by Joinsu on 2018-07-31.
 */

@Injectable()
export class CommonService {

  private _user: User;
  private _caseTypeCategory: Subject<CaseTypeCategory> = new BehaviorSubject<CaseTypeCategory>(null);

  constructor(){}

  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }

  public setCaseTypeCategory(value: CaseTypeCategory): void{
    this._caseTypeCategory.next( value);
  }

  public getCaseTypeCategory(): Subject<CaseTypeCategory> {
    return this._caseTypeCategory;
  }

  public changeValueToUpperCase( formControlObj: FormControl): void{
    if( formControlObj.value){
      formControlObj.setValue( formControlObj.value.toUpperCase());
    }
  }

  public deleteFrontZeroFromInteger( formControlObj: AbstractControl): void{
    let value = Number( formControlObj.value);
    if( !isNaN( value)){
      formControlObj.setValue( value);
    }
  }

  public addZeroToSingleDecimal( formControlObj: AbstractControl): void{
    if( formControlObj.value.length === 1){
      formControlObj.setValue( formControlObj.value + "0");
    }
  }

  public getIntegerFromFee( fee: number): number{
    if( isUndefined( fee)){
      return 0;
    }

    if( fee == 0){
      return 0;
    }else{
      return Math.floor( fee);
    }
  }

  public getDecimalFromFee(fee: number): string {
    if( isUndefined( fee)){
      return "00";
    }
    if( fee == 0){
      return "00";
    }else{
      let decimal:string = parseFloat( ((fee - Math.trunc( fee)) * 100).toString()).toFixed(0);
      if( decimal.length === 1){
        return decimal + "0";
      }else{
        return decimal;
      }
    }
  }

  public getStringDateFromDate(birthDate: Date): string{
    if( !birthDate){
      return "-";
    }
    var date = (birthDate.getDate() < 10 ? '0' : '') + birthDate.getDate();
    var month = ((birthDate.getMonth() + 1) < 10 ? '0' : '') + (birthDate.getMonth() + 1);

    return birthDate.getFullYear() + "-" + month + "-" + date;
  }

  public getCreatedRange( min: number, max: number): Array<number>{
    let range = new Array();
    if( min > max){
      while( min > max){
        range.push( min);
        min--;
      }
    }else{
      for( let value = min ; value < max ; value++){
        range.push( value);
      }
    }
    return range;
  }

  public addZeroToCaseNo( caseNo: string): string{
    if( caseNo.length !== 8){
      let needLength = 8 - caseNo.length;
      for(let i = 0 ; i < needLength; i++){
        caseNo = "0" + caseNo;
      }
    }
    return caseNo;
  }
}
