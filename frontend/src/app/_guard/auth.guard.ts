/**
 * Created by Joinsu on 2017-05-07.
 */
import {Injectable} from "@angular/core";
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable, of} from "rxjs";
import {AuthService} from "../_service/auth.service";
import {ErrorService} from "../_service/error.service";

@Injectable()
export class AuthGuard implements CanActivate{

  constructor( private _router: Router,
               private _authService: AuthService,
               private _errorService: ErrorService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {

    if( this._authService.isNullLocalStorageUser()){
      this._router.navigate([ '/login']);
      return of(false);
    }

    return this._authService.isAuthenticatedUser().map( data => { return this.afterUrlCall( data, this._router)}).catch( err => { return this.afterError( err, this._router)});
  }

  private afterUrlCall( data, router: Router){
    return true;
  }

  private afterError( err: any, router: Router) : Observable<boolean> {
    this._errorService.reportError( err, this._authService.authenticatedUserInfo);
    this._authService.clearUserFromLocalStorage();
    this._router.navigate([ '/login']);
    return of(false);
  }
}


