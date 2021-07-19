/**
 * Created by Joinsu on 2019-05-03.
 */
import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {HttpResponse, HttpEventType} from "@angular/common/http";
import {FileService} from "../_service/file.service";
import {FormGroup, AbstractControl, FormControl, Validators, FormBuilder} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {RestfulUrlService} from "../_service/restful-url.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ErrorService} from "../_service/error.service";
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'coims-form-upload',
  templateUrl: './form-upload.component.html',
})
export class FormUploadComponent implements OnInit {

  @Input() caseId: number;
  @Input() docId: number;
  @Output() fileUploaded: EventEmitter<any> = new EventEmitter<any>();

  private _selectedFiles: FileList;
  private _uploadTargetFile: File;
  private _progress: { percentage: number }= { percentage: 0 };
  private _maxSizeError: boolean;
  private _existFileName: any;
  private _isFileExist: boolean;

  private _fileUploadForm: FormGroup;
  private _fileSelectBox: AbstractControl;
  private _selectedFileName: AbstractControl;

  constructor(private _fileService: FileService,
              private _fb: FormBuilder,
              private _http: HttpClient,
              private _urlService: RestfulUrlService,
              private _errService: ErrorService
  ){}

  ngOnInit() {
    this.initValuables();
    this.initForm();
    this.setExistFile();
  }

  private initValuables() {
    this._maxSizeError = false;
    this._isFileExist = false;
    this._existFileName = '';
  }

  private initForm() {
    this._fileSelectBox = new FormControl( '', {validators: Validators.required});
    this._selectedFileName = new FormControl( '');
    this._selectedFileName.disable();
    this._fileUploadForm = this._fb.group({
      fileSelectBox: this._fileSelectBox,
      selectedFileName: this._selectedFileName
    });
  }

  private setExistFile() {
    if( this.docId){
      let param: Object = {
        'caseId': this.caseId.toString(),
        'docId': this.docId.toString()
      };
      this._http.post( this._urlService.findCaseDocFileName, JSON.stringify( param), {headers: this._urlService.headerJson})
        .subscribe( responseData => this.afterFindExistFile( responseData), (err :HttpErrorResponse)=> this.afterError( err, "[Case ID] - " + this.caseId + ", [Doc ID] - " + this.docId));
    }
  }

  private afterFindExistFile(responseData: any) {
    if( responseData.fileName && responseData.fileName.length > 0){
      this._existFileName = responseData.fileName;
      this._isFileExist = true;
      this.fileUploaded.emit( true);
    }else{
      this._existFileName = undefined;
      this._selectedFiles = undefined;
      this._fileSelectBox.setValue( "");
      this._selectedFileName.setValue( "");
      this._isFileExist = false;
      this.fileUploaded.emit( false);
    }
  }

  selectFile(event): void {
    if( event.target.files[0]){
      if( event.target.files.item(0).size < 4194304){
        this._selectedFiles = event.target.files;
        this._selectedFileName.setValue( event.target.files[0].name);
        this._maxSizeError = false;
      }else{
        this._maxSizeError = true;
        this._selectedFiles = undefined;
        this._fileSelectBox.setValue( "");
        this._selectedFileName.setValue( "");
      }
    }
  }

  upload() {
    this._uploadTargetFile = this._selectedFiles.item(0);
    this._fileService.pushFileToStorage( this._uploadTargetFile, this.caseId, this.docId).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this._progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        if( this._progress.percentage === 100){
          this.clearFileInformation();
          this._existFileName = event.body;
          this._isFileExist = true;
          this._uploadTargetFile = undefined;
          this.fileUploaded.emit( true);
        }
      }
    })
  }

  private clearFileInformation(): void{
    this._selectedFiles = undefined;
  }

  public downloadFile(): void{
    let param: Object = {
      'caseId': this.caseId.toString(),
      'docId': this.docId.toString()
    };
    this._http.post( this._urlService.downDocFile, JSON.stringify( param), {headers: this._urlService.headerJson, responseType: 'blob'})
      .subscribe( data => this.afterDownload(data), ( err :HttpErrorResponse)=> this.afterError( err, JSON.stringify( param)));
  }

  private afterError( err: HttpErrorResponse, evidence: string) {
    this._errService.reportError( err, evidence);
  }

  private afterDownload(obj: Blob) {
    var url = window.URL.createObjectURL( obj);
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = url;
    a.download = this._existFileName;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

  public deleteFile(){
    let param: Object = {
      'caseId': this.caseId.toString(),
      'docId': this.docId.toString()
    };
    this._http.post( this._urlService.deleteDocFile, JSON.stringify( param), {headers: this._urlService.headerJson})
      .subscribe( data => this.afterDelete(data), ( err :HttpErrorResponse)=> this.afterError( err, JSON.stringify( param)));
  }

  private afterDelete( result: any) {
    if( result){
      this.setExistFile();
    }else{
      this._errService.reportErrorJustMessage( "File is not deleted. [Case ID] - " + this.caseId + ", [Doc ID] - " + this.docId);
    }
  }
}
