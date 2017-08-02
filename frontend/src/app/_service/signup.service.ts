/**
 * Created by Joinsu on 2017-05-11.
 */
import {Injectable}         from "@angular/core";
import {SignupProgressBar}  from "../_model/signup-progressbar";
import {Consultant}         from "../_model/consultant";
import {Company}            from "../_model/company";

@Injectable()
export class SignupService{

  private _progressBarObj:SignupProgressBar;
  private _consultantObj:Consultant;

  constructor(){}

  get progressBarObj():SignupProgressBar{
    if( !this._progressBarObj){
      this._progressBarObj = new SignupProgressBar();
    }
    return this._progressBarObj;
  }

  get newConsultantObj():Consultant{

    if( !this.isNullConsultantObj()){
      this._consultantObj = null;
    }

    this._consultantObj = new Consultant();
    this._consultantObj.company = new Company();

    return this._consultantObj;
  }

  get consultantObj(): Consultant{
    return this._consultantObj;
  }

  public isNullConsultantObj():boolean{
    if( this._consultantObj){
      return false;
    }
    return true;
  }
}
