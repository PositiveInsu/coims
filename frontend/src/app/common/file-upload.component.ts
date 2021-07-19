import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import {FileService} from "../_service/file.service";
/**
 * Created by Joinsu on 2019-05-03.
 */
@Component({
  selector: 'coims-file-upload',
  templateUrl: './file-upload.component.html',
})
export class FileUploadComponent implements OnInit {

  private _showFile = false;
  private _fileUploads: Observable<string[]>;

  constructor(private _fileService: FileService) {}

  ngOnInit() {
  }

  showFiles(enable: boolean) {
    this._showFile = enable;
  }
}
