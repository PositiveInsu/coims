import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {DataLoadService} from "../_service/data-load.service";
/**
 * Created by Joinsu on 2018-08-01.
 */
@Injectable()
export class GetAuthenticatedUserResolve implements Resolve<any>{

  constructor( private _dataLoadService: DataLoadService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any {
    return this._dataLoadService.getAuthenticatedUser();
  }
}
