import {FormControl, AbstractControl, ValidatorFn} from "@angular/forms";
/**
 * Created by Joinsu on 2018-08-17.
 */
export function checkPWEqualValidator( password: AbstractControl): ValidatorFn{
  return (control: AbstractControl): {[key: string]: any} => {
    let value: string = control.value;
    let result: boolean = false;

    let resultObj = { equalPassword: {
      valid: false,
      message: ''
    }};

    if(!value){ return null;}

    if( value !== password.value){
      result = true;
      resultObj.equalPassword.message = 'The password do not match. Please try again.';
    };

    return result ? resultObj : null;
  };
}
