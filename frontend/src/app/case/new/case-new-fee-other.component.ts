import {Component, OnInit, Input, EventEmitter, Output} from "@angular/core";
import {FormGroup, FormBuilder, AbstractControl, FormControl, Validators} from "@angular/forms";
import {OtherFee} from "../../_model/case-fee";
import {SignupValidator} from "../../_validator/signup.validator";
import {CommonService} from "../../_service/common.service";
/**
 * Created by Joinsu on 2019-03-27.
 */
@Component({
  selector:'coims-case-new-fee-other',
  templateUrl: 'case-new-fee-other.component.html',
  providers: []
})
export class CaseNewFeeOtherComponent implements OnInit{

  @Input() otherFeeNumber: number;
  @Input() otherFeeList: Array<OtherFee>;

  @Output() setOtherFee = new EventEmitter<OtherFee>();

  private _note:string;
  private _otherFee: number;
  private _otherFeeInformation: FormGroup;
  private _otherNote: AbstractControl;
  private _otherFeeD: AbstractControl;
  private _otherFeeC: AbstractControl;

  constructor( private _fb: FormBuilder,
               private _commonService: CommonService
  ){}

  ngOnInit(): void {
    this._note = this.otherFeeList[ this.otherFeeNumber].note;
    this._otherFee = this.otherFeeList[ this.otherFeeNumber].fee;
    this.initForm();
  }

  private initForm(): void{
    this._otherFeeD = new FormControl( this.getDollar( this._otherFee), {updateOn: 'blur', validators: Validators.compose([ Validators.pattern( SignupValidator.caseFeeDollarExp)])});
    this._otherFeeC = new FormControl( this.getCent( this._otherFee), {updateOn: 'blur', validators: Validators.compose([ Validators.pattern( SignupValidator.caseFeeCentExp)])});
    this._otherNote  = new FormControl( this._note);

    this._otherFeeInformation = this._fb.group({
      otherFeeD: this._otherFeeD,
      otherFeeC: this._otherFeeC,
      otherNote: this._otherNote
    })
  }

  private getDollar( caseFee: number): number{
    return this._commonService.getIntegerFromFee( caseFee);
  }

  private getCent( caseFee: number): string{
    return this._commonService.getDecimalFromFee( caseFee);
  }

  private changeOtherFee(): void{
    this.setOtherFee.emit( new OtherFee( this.otherFeeNumber, this.getOtherFee(), this._otherNote.value));
  }

  private getOtherFee(): number{
    return Number( this._otherFeeD.value + '.' + this._otherFeeC.value);
  }

  private checkHasError( formControlObj:FormControl): boolean{
    return formControlObj.touched && !formControlObj.valid;
  }
}
