/**
 * Created by Joinsu on 2017-05-11.
 */
import {Injectable}         from "@angular/core";
import {SignupProgressBar}  from "../_model/signup-progressbar";
import {Consultant}         from "../_model/consultant";
import {Company}            from "../_model/company";
import {Router}             from "@angular/router";

@Injectable()
export class SignupService{

  private _progressBarObj:SignupProgressBar;
  private _consultantObj:Consultant;
  private _signupStepUrl:string = '/signup/step';
  private _loginPageUrl:string = '/login';

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
    this._consultantObj.company.country = 'CA';
    this._consultantObj.company.province = 'MB';

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

  public deleteConsultantObj(){
    this._consultantObj = null;
  }

  public goLoginPage( router: Router){
    this.deleteConsultantObj();
    router.navigate([ this._loginPageUrl]);
  }

  public previousStep( router: Router){
    router.navigate([ this._signupStepUrl + (this._progressBarObj.currentStep - 1)]);
  }

  public nextStep( router: Router){
    router.navigate([ this._signupStepUrl + (this._progressBarObj.currentStep + 1)]);
  }

  public moveToStep( router: Router, stepNumber: number){
    router.navigate([ this._signupStepUrl + stepNumber]);
  }
}
