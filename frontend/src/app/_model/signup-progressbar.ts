/**
 * Created by Joinsu on 2017-05-11.
 */
export class SignupProgressBar{

  private _signupSteps:any;
  private _current_step:number;

  constructor() {
    this._current_step = 0;
    this._signupSteps = [
      { step: 1, stepName: 'Personal Information'},
      { step: 2, stepName: 'Company Information'},
      { step: 3, stepName: 'Verification'},
      { step: 4, stepName: 'Compelete'}
    ];
  }

  set currentStep( step: number){
    this._current_step = step-1;
  }

  get currentStep(): number{
    return this._signupSteps[this._current_step].step;
  }

  get currentStepName(): string{
    return this._signupSteps[this._current_step].stepName;
  }

  get currentStepPercentage(): number{
    return 100 / this._signupSteps.length * this.currentStep;
  }
}

