/**
 * Created by Joinsu on 2019-05-03.
 */
import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'coims-details-upload',
  templateUrl: './detail-upload.component.html',
})
export class DetailsUploadComponent implements OnInit {

  @Input() fileUpload: string;

  constructor() {}

  ngOnInit() {
  }

}
