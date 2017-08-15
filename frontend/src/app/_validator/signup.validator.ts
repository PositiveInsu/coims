import {FormControl, ValidatorFn, AbstractControl} from "@angular/forms";
/**
 * Created by Joinsu on 2017-05-22.
 */
export class SignupValidator{

  static uppercaseNameRegExp = '[A-Z]{1,15}';
  static emailRegExp = '[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}';
  static phoneNoRegExp = '[0-9]{3}-[0-9]{3}-[0-9]{4}';
  static iccrcNoRegExp = '^R[0-9]{6}';

  static password( control: FormControl){

    let value:string = control.value;
    let upperCaseReg:RegExp = new RegExp( "(?=.*[A-Z]).{8,}");
    let lowerCaseReg:RegExp = new RegExp( "(?=.*[a-z]).{8,}");
    let digitReg:RegExp = new RegExp( "(?=.*[0-9]).{8,}");
    let characterReg:RegExp = new RegExp( "(?=.*[^a-zA-Z0-9]).{8,}");
    let result:boolean = false;
    let resultObj = { password: {
      valid: false,
      message: ''
    }};

    if(!value){ return null;}

    if( value.length < 8){
      result = true;
      resultObj.password.message = 'Password too short. Use at least 8 characters.';
    } else if( !upperCaseReg.test( value)){
      result = true;
      resultObj.password.message = 'Use the 1 uppercase alphabet';
    } else if( !lowerCaseReg.test( value)){
      result = true;
      resultObj.password.message = 'Use the 1 lowercase alphabet';
    } else if( !characterReg.test( value)){
      result = true;
      resultObj.password.message = 'Use the 1 special character';
    } else if( !digitReg.test( value)){
      result = true;
      resultObj.password.message = 'Use the 1 digit';
    }

    return result ? resultObj : null;
  }
}
