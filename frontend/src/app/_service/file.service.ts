import {Injectable} from "@angular/core";
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {RestfulUrlService} from "./restful-url.service";
/**
 * Created by Joinsu on 2019-05-03.
 */
@Injectable()
export class FileService {

  OVER_SIZE_ERROR : string = 'OVER_SIZE_ERROR';

  constructor(private _http: HttpClient,
              private _urlService: RestfulUrlService
  ) {}

  pushFileToStorage(file: File, caseId: number, docId: number): Observable<HttpEvent<{}>> {
    let data: FormData = new FormData();
    data.append( 'file', file);
    data.append( 'caseId', caseId.toString());
    data.append( 'docId', docId.toString());

    const req = new HttpRequest('POST', this._urlService.uploadCaseDocFile, data, {
      reportProgress: true,
      responseType: 'text'
    });

    return this._http.request(req);
  }
}















