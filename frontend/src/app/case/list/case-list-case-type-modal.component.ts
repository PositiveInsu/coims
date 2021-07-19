import {Component, OnInit, Output, EventEmitter} from "@angular/core";
import {CaseTypeCategory, CaseType} from "../../_model/case-type";
import {FormGroup, AbstractControl, FormBuilder, FormControl} from "@angular/forms";
import {CommonService} from "../../_service/common.service";
declare var $ :any;
/**
 * Created by Joinsu on 2019-04-30.
 */
@Component({
  selector:'coims-case-list-case-type-modal',
  templateUrl: './case-list-case-type-modal.component.html',
  providers: []
})
export class CaseListCaseTypeModalComponent implements OnInit {

  @Output() selectedCaseType = new EventEmitter<CaseType>();

  private _caseTypeCategory: CaseTypeCategory;
  private _categoryKeyList: Array<string>;
  private _parentCaseTypeList: Array<CaseType>;
  private _childCaseTypeList: Array<CaseType>;
  private _currentCaseType: CaseType;
  private _isOpenMessage: boolean;

  private _caseTypeForm: FormGroup;
  private _category: AbstractControl;
  private _parentCaseType: AbstractControl;
  private _childCaseType: AbstractControl;

  constructor( private _commonService: CommonService,
               private _fb: FormBuilder
  ){}

  ngOnInit(): void {
    this.initForm();
    this.initValuables();
  }

  private initValuables(): void{
    this._caseTypeCategory = new CaseTypeCategory();
    this._categoryKeyList = Object.keys( this._caseTypeCategory);
    this._isOpenMessage = false;
    this._commonService.getCaseTypeCategory().subscribe(( obj: CaseTypeCategory) => { this.setCaseTypeCategory( obj);});
  }

  private initForm() {
    this._category = new FormControl( '');
    this._parentCaseType = new FormControl( '');
    this._childCaseType = new FormControl( '');

    this._caseTypeForm = this._fb.group({
      category: this._category,
      parentCaseType: this._parentCaseType,
      childCaseType: this._childCaseType
    });
  }

  private setCaseTypeCategory( obj: CaseTypeCategory): void{
    if( obj !== null){
      this._caseTypeCategory = obj;
    }
  }

  private selectCaseCategory( value): void{
    this._parentCaseTypeList = this._caseTypeCategory[ value];
    if( !this._parentCaseTypeList){
      this._parentCaseTypeList = null;
    }
    this._childCaseTypeList = null;
    this._parentCaseType.setValue('');
    this._childCaseType.setValue('');
    this.clearSelectedCaseType();
  }

  private selectParentCaseType( value): void{
    if( value.length == 0){
      this.clearSelectedCaseType();
      this._childCaseTypeList = null;
      return;
    }
    let selectedCaseType: CaseType = this._parentCaseTypeList[ value];

    if( selectedCaseType.isExistChild()){
      this._childCaseTypeList = selectedCaseType.chlidCaseTypeList;
      this.clearSelectedCaseType();
    }else{
      this._currentCaseType = selectedCaseType;
      this._childCaseTypeList = null;
    }

    this._childCaseType.setValue('');
  }

  private selectChildCaseType( value): void{
    if( value.length == 0){
      this.clearSelectedCaseType();
      return;
    }
    this._currentCaseType = this._childCaseTypeList[ value];
  }

  private clearSelectedCaseType(): void{
    this._currentCaseType = null;
  }

  private selectCaseType(): void{
    if( this._currentCaseType){
      this.selectedCaseType.emit( this._currentCaseType);
      this.clearData();
      $('#case-list-case-type-modal').modal('hide');
    }else{
      this._isOpenMessage = true;
    }
  }

  private cancel(): void{
    this.selectedCaseType.emit( null);
    $('#case-list-case-type-modal').modal('hide');
  }

  private clearData(): void{
    this._category.setValue( "");
    this._parentCaseTypeList = null;
    this._childCaseTypeList = null;
    this._currentCaseType = null;
    this._isOpenMessage = false;
  }
}




