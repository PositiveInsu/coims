import {
  Component,
  OnInit,
  ViewChild,
  ComponentFactoryResolver,
  ComponentRef,
  AfterViewChecked,
  ChangeDetectorRef, OnDestroy
} from "@angular/core";
import {MainService} from "../../_service/main.service";
import {MainComponent} from "../../main/main.component";
import {CaseNewService, CaseDtoContainer} from "../../_service/case-new.service";
import {NewCaseDto} from "../../_model/case-dto";
import {CaseNewPersonalInfoDependentDirective} from "../../_directive/case-new-personal-info.directive";
import {CaseNewPersonalInfoDependentComponent} from "./case-new-personal-info-dependent.component";
import {FormGroup, FormBuilder, FormControl, AbstractControl, Validators} from "@angular/forms";
import {CaseType} from "../../_model/case-type";
import {CommonService} from "../../_service/common.service";
import {SignupValidator} from "../../_validator/signup.validator";
import {User} from "../../_model/user";
import {CommonDataService, MonthName} from "../../_service/common-data.service";
import {Router} from "@angular/router";
import {UserType} from "../../_model/user-type";
declare var $ :any;

/**
 * Created by Joinsu on 2018-12-17.
 */
@Component({
  selector:'coims-case-new-personal-info',
  templateUrl: 'case-new-personal-info.component.html',
  providers: []
})
export class CaseNewPersonalInfoComponent implements OnInit, AfterViewChecked, OnDestroy{

  @ViewChild( CaseNewPersonalInfoDependentDirective) dependentInfoDirective;

  private _caseDto: NewCaseDto;
  private _isCheckedClient: boolean;
  private _isNullCaseDto: boolean;
  private _isPushNextStep: boolean;
  private _monthList: MonthName[];
  private _thisYear: number;
  private _userType: UserType;
  private _selectedUser: User;

  private _mainApplicant: FormGroup;
  private _email: AbstractControl;
  private _fName: AbstractControl;
  private _lName: AbstractControl;
  private _phoneNo: AbstractControl;
  private _bMonth: AbstractControl;
  private _bDate: AbstractControl;
  private _bYear: AbstractControl;

  constructor(private _commonService: CommonService,
              private _commonDataService: CommonDataService,
              private _mainService: MainService,
              private _caseNewService: CaseNewService,
              private _parent: MainComponent,
              private _componentFactoryResolver: ComponentFactoryResolver,
              private _fb: FormBuilder,
              private _cdRef:ChangeDetectorRef,
              private _router: Router,
  ){}

  ngOnInit(): void {
    this._mainService.changeMenu( this._mainService.leftMenuFactory.CASE_NEW);
    this.checkCaseDtoContainerList();
    this.initCaseStep();
    this.initValuables();
    this.initForm();
    this.initData();
    this._parent.detectChanges();
  }

  ngAfterViewChecked(): void {
    this._cdRef.detectChanges();
  }

  private checkCaseDtoContainerList() {
    this._isNullCaseDto = this._caseNewService.isNullCaseDtoContainerList();
    if( this._isNullCaseDto){
      this._caseNewService.initCaseDtoContainerList();
    }
  }

  private initCaseStep() {
    this._caseNewService.setFirstCaseStep();
  }

  private initValuables() {
    this._caseDto = this._caseNewService.getCaseDto( this._caseNewService.MAIN_CASE_NUMBER);
    this._monthList = this._commonDataService.months;
    this._thisYear = new Date().getFullYear();
    this._userType = new UserType();
    this._isPushNextStep = false;
  }

  private initForm() {
    this._email = new FormControl( '', { updateOn:'blur', validators: Validators.compose([ Validators.required, Validators.pattern( SignupValidator.emailRegExp)])});
    this._fName = new FormControl( '', { updateOn:'blur', validators: Validators.compose([ Validators.required, Validators.pattern( SignupValidator.uppercaseNameRegExp)])});
    this._lName = new FormControl( '', { updateOn:'blur', validators: Validators.compose([ Validators.required, Validators.pattern( SignupValidator.uppercaseNameRegExp)])});
    this._phoneNo = new FormControl( '', Validators.required);
    this._bMonth = new FormControl( '');
    this._bDate = new FormControl( '');
    this._bYear = new FormControl( '');

    this._mainApplicant = this._fb.group({
      fName: this._fName,
      lName: this._lName,
      phoneNo: this._phoneNo,
      email: this._email,
      bMonth: this._bMonth,
      bDate: this._bDate,
      bYear: this._bYear
    });
  }


  private initData() {
    if( !this._isNullCaseDto){
      this.setClient( this._caseDto.getUser());
      this.setDependentInfo();
    }
  }

  private setDependentInfo() {
    let caseDtoContainerList: Array<CaseDtoContainer> = this._caseNewService.caseDtoContainerList;
    if( caseDtoContainerList.length > 1){
      for( let i = 1; i < caseDtoContainerList.length; i++){
        this.addDependent( i);
      }
    }
  }

  private isNullBirthdate(): boolean{
    if( this._caseDto.getUser().getBirthDate()){
      return false;
    }
    return true;
  }

  private checkHasError( formControlObj:FormControl): boolean{
    return formControlObj.touched && !formControlObj.valid;
  }

  private changeValueToUpperCase( formControlObj: FormControl): void{
    if( formControlObj.value){
      formControlObj.setValue( formControlObj.value.toUpperCase());
    }
  }

  private checkClientEmail(): void{
    if( this._email.valid){
      $('#client-email-check-0').modal('show');
    }
  }

  private setClient(selectedUser?: User): void{
    this._isCheckedClient = true;
    this._selectedUser = selectedUser;
    if( selectedUser){
      this._email.setValue( selectedUser.getEmail());
      this._fName.setValue( selectedUser.getFName());
      this._lName.setValue( selectedUser.getLName());
      this._phoneNo.setValue( selectedUser.getPhoneNo());
      if( selectedUser.getBirthDate()){
        this._bMonth.setValue( selectedUser.getBirthDate().getMonth() + 1);
        this._bDate.setValue( selectedUser.getBirthDate().getUTCDate());
        this._bYear.setValue( selectedUser.getBirthDate().getFullYear());
      }
      if( selectedUser.getId()){
        this.disableForm( true);
      }
    }else{
      this._fName.reset();
      this._lName.reset();
      this._phoneNo.reset();
      this._bMonth.setValue('');
      this._bDate.setValue('');
      this._bYear.setValue('');
      this.disableForm( false);
    }
  }

  private disableForm( doDisable: boolean): void {
    if( doDisable){
      this._fName.disable();
      this._lName.disable();
      this._bMonth.disable();
      this._bDate.disable();
      this._bYear.disable();
    }else{
      this._fName.enable();
      this._lName.enable();
      this._bMonth.enable();
      this._bDate.enable();
      this._bYear.enable();
    }
  }

  private getRange( min:number, max:number): Array<number>{
    return this._commonService.getCreatedRange( min, max);
  }

  private addDependent( dependentNo?: number): void{
    let dependentComponent = this._componentFactoryResolver.resolveComponentFactory( CaseNewPersonalInfoDependentComponent);
    let viewContainerRef = this.dependentInfoDirective.viewContainerRef;
    let dependentComponentRef: ComponentRef<CaseNewPersonalInfoDependentComponent> = viewContainerRef.createComponent( dependentComponent);
    this.setDependentData( dependentComponentRef, dependentNo);
  }

  private setDependentData(dependentComponentRef: ComponentRef<CaseNewPersonalInfoDependentComponent>, dependentNo?: number) {
    let caseNumber: number = dependentNo ? dependentNo : this._caseNewService.getNewCaseNumber();
    dependentComponentRef.instance.caseNumber = caseNumber;
    dependentComponentRef.instance.componentRef = dependentComponentRef;
    dependentComponentRef.instance.mainApplicantEmail = this._email.value;
    if( dependentNo){
      let caseDtoContainerList: Array<CaseDtoContainer> = this._caseNewService.caseDtoContainerList;
      dependentComponentRef.instance.existedCaseDto = caseDtoContainerList[dependentNo].caseDto;
      this._caseNewService.caseNumber = dependentNo;
    }
  }

  private setCaseType( selectedCaseType: CaseType): void{
    this._caseDto.setCaseType( selectedCaseType);
  }

  private isPersonalInfosValid(): boolean{
    if( this._mainApplicant.valid && this._caseDto.getCaseType() && this._caseNewService.isDependentPersonalInfoValid()){
      return true;
    }
    return false;
  }

  private nextStep(): void{
    if( this.isPersonalInfosValid()){
      this._caseNewService.setMainAppilcantDataToDto( this.getUserObjFromForm());
      this._caseNewService.setDependentDataToDto();
      this._caseNewService.nextStep( this._router);
      this._isPushNextStep = true;
    }
  }

  private goCaseList(): void{
    // Todo: move to case list page. now, case list page is not exist.
  }

  private getUserObjFromForm(): User {
    let mainApplicant: User = new User();
    let birthDate: Date = null;
    if( this._selectedUser){
      this.updateChangedInformation();
      mainApplicant = this._selectedUser;
    }else{
      mainApplicant.setFName( this._fName.value);
      mainApplicant.setLName( this._lName.value);
      mainApplicant.setType( this._userType.CLIENT);
      mainApplicant.setEmail( this._email.value);
      mainApplicant.setPhoneNo( this._phoneNo.value);

      if( this._bDate.value.length > 0 && this._bMonth.value.length > 0 && this._bYear.value.length > 0){
        birthDate = new Date( this._bYear.value + "-" + this._bMonth.value + "-" + this._bDate.value);
      }
      mainApplicant.setBirthDate( birthDate);
    }
    return mainApplicant;
  }

  private updateChangedInformation() {
    if( this._selectedUser.getType() != this._userType.CLIENT){
      this._selectedUser.setType( this._userType.CLIENT);
    }

    if( this._selectedUser.getPhoneNo() != this._phoneNo.value){
      this._selectedUser.setPhoneNo( this._phoneNo.value);
    }
  }

  ngOnDestroy(): void {
    if( !this._isPushNextStep){
      this._caseNewService.destroyCaseDtoContainerList();
    }
  }
}
