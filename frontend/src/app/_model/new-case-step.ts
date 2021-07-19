/**
 * Created by Joinsu on 2018-12-14.
 */
export class NewCaseStep{

  private _currentStep: number;
  private _stepObj: Array<any>;

  constructor() {
    this._currentStep = 0;
    this._stepObj = [
      { step: 1, stepName: 'Information', activeClass: true, onClass: true},
      { step: 2, stepName: 'Fee', activeClass: false, onClass: false},
      // { step: 3, stepName: 'Questions', activeClass: false, onClass: false},
      { step: 3, stepName: 'Documents', activeClass: false, onClass: false},
      { step: 4, stepName: 'Review', activeClass: false, onClass: false},
      { step: 5, stepName: 'Complete', activeClass: false, onClass: false},
    ];
  }

  get currentStep(): number {
    return this._currentStep + 1;
  }

  public firstStep(){
    this._currentStep = 0;
    this.changeStepObj();
  }

  public nextStep(){
    if( this._currentStep == this._stepObj.length){
      return;
    }
    this._currentStep = this._currentStep + 1;
    this.changeStepObj();
  }

  public previousStep(){
    if( this._currentStep == 0){
      return;
    }
    this._currentStep = this._currentStep - 1;
    this.changeStepObj();
  }

  get stepObj(): any {
    return this._stepObj;
  }

  private changeStepObj() {

    let nowStep = this._currentStep + 1;

    for( let stepObj of this._stepObj){
      if( stepObj.step == nowStep){
        stepObj.activeClass = true;
        stepObj.onClass = true;
      }else if( stepObj.step < nowStep){
        stepObj.activeClass = true;
        stepObj.onClass = false;
      }else{
        stepObj.activeClass = false;
        stepObj.onClass = false;
      }
    }
  }
}
