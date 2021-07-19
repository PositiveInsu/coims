/**
 * Created by Joinsu on 2018-07-19.
 */
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {HttpHeaders} from "@angular/common/http";
import {RestfulUrlService} from "./restful-url.service";

@Injectable()
export class AuthService{

  private _localStorageKey: string = 'coims';

  constructor( private _http: HttpClient,
               private _urlService: RestfulUrlService
  ){}

  isAuthenticatedUser():Observable<any>{
    return this._http.post(
      this._urlService.isAuthenticatedUserApi,
      localStorage.getItem( this._localStorageKey),
      { headers: this._urlService.headerTextPlain}
    );
  }

  clearUserFromLocalStorage() {
    if( localStorage.getItem( this._localStorageKey)){
      localStorage.removeItem( this._localStorageKey);
    }
  }

  setLocalStorageUser( data: any) {
    localStorage.setItem( this._localStorageKey, data.email);
  }

  get authenticatedUserInfo(): string {
    return localStorage.getItem( this._localStorageKey);
  }

  isNullLocalStorageUser(): boolean{
    if( this.authenticatedUserInfo){
      return false;
    }else{
      return true;
    }
  }

  logout(){
    this.clearUserFromLocalStorage();
    window.location.href = "/";
  }
}
