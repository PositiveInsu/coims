import {Component, OnInit, Output, EventEmitter, Input} from "@angular/core";
import {CaseTypeCategory, CaseType} from "../../_model/case-type";
import {CommonService} from "../../_service/common.service";
import {FormGroup, FormBuilder, AbstractControl, FormControl} from "@angular/forms";
/**
 * Created by Joinsu on 2019-03-08.
 */

@Component({
  selector:'coims-case-new-case-type',
  templateUrl: './case-new-case-type.component.html',
  providers: []
})
export class CaseNewCaseTypeComponent implements OnInit{

  @Input() caseType: CaseType;
  @Output() selectedCaseType= new EventEmitter<CaseType>();

  private _caseTypeCategory: CaseTypeCategory;
  private _categoryKeyList: Array<string>;
  private _selectedCaseTypeCategory: string;
  private _parentCaseTypeList: Array<CaseType>;
  private _childCaseTypeList: Array<CaseType>;

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
      this.setExistCaseType();
    }
  }

  private setExistCaseType(): void {
    if( this.caseType){
      this._category.setValue( this.caseType.getCategory());
      this.setCaseType( this._caseTypeCategory[ this.caseType.getCategory()]);
    }
  }

  private setCaseType( caseTypeList: Array<CaseType>): void{
    if( this.caseType.getPid() !== 0){
      this._parentCaseType.setValue( this.getTargetValue( caseTypeList, this.caseType.getPid()));
      this._parentCaseTypeList = caseTypeList;

      let childCaseTypeList: Array<CaseType> = caseTypeList[ this._parentCaseType.value].chlidCaseTypeList;
      this._childCaseType.setValue( this.getTargetValue( childCaseTypeList, this.caseType.getId()))
      this._childCaseTypeList = childCaseTypeList;
    }else{
      this._parentCaseType.setValue( this.getTargetValue( caseTypeList, this.caseType.getId()));
      this._parentCaseTypeList = caseTypeList;
    }
  }

  private getTargetValue(caseTypeList: Array<CaseType>, findKey: number): number{
    let index: number = 0;
    for(let caseType of caseTypeList){
      if( caseType.getId() === findKey){
        return index;
      }
      index++;
    }
    return 0;
  }

  private isHaveParent() {
    return this.caseType.getPid() != 0;
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
      this.selectCaseType( selectedCaseType);
      this._childCaseTypeList = null;
    }
    this._childCaseType.setValue('');
  }

  private selectChildCaseType( value): void{
    if( value.length == 0){
      this.clearSelectedCaseType();
      return;
    }
    this.selectCaseType( this._childCaseTypeList[ value]);
  }

  private clearSelectedCaseType(): void{
    this.selectedCaseType.emit( null);
  }

  private selectCaseType(selectedCaseType: CaseType): void{
    this.selectedCaseType.emit( selectedCaseType);
  }

}
