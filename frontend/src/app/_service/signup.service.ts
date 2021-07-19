/**
 * Created by Joinsu on 2017-05-11.
 */
import {Injectable}         from "@angular/core";
import {SignupProgressBar}  from "../_model/signup-progressbar";
import {User}         from "../_model/user";
import {Company}            from "../_model/company";
import {Router}             from "@angular/router";

@Injectable()
export class SignupService {

  private _progressBarObj: SignupProgressBar;
  private _consultantObj: User;
  private _signupStepUrl: string = '/signup/step';
  private _loginPageUrl: string = '/login';

  constructor(){}

  get progressBarObj():SignupProgressBar{
    if( !this._progressBarObj){
      this._progressBarObj = new SignupProgressBar();
    }
    return this._progressBarObj;
  }

  get newConsultantObj():User{

    if( !this.isNullConsultantObj()){
      this._consultantObj = null;
    }

    this._consultantObj = new User();
    this._consultantObj.setCompany( this.getNewCompanyObj());

    return this._consultantObj;
  }

  get consultantObj(): User{
    return this._consultantObj;
  }

  public getNewCompanyObj():Company{

    var companyObj = new Company();
    companyObj.setCountry( 'CA');
    companyObj.setProvince( 'MB');

    return companyObj;
  }

  public isNullConsultantObj():boolean{
    if( this._consultantObj){
      if( this._consultantObj.getEmail() != null){
        return false;
      }
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
