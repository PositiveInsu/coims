/**
 * Created by Joinsu on 2017-04-30.
 */
import {Component, OnInit}      from "@angular/core";
import {Router}                 from "@angular/router";
import {HttpClient}             from "@angular/common/http";
import {HttpHeaders}            from "@angular/common/http";
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";
import {AppConfig} from "../app.config";
import {AuthService} from "../_service/auth.service";
import {HttpResponse} from "@angular/common/http";
import {HttpErrorResponse} from "@angular/common/http";
import {ErrorService} from "../_service/error.service";
import {RestfulUrlService} from "../_service/restful-url.service";

@Component({
  selector:'coims-login',
  templateUrl: './login.component.html',
  providers: []
})
export class LoginComponent implements OnInit{

  private _loginForm: FormGroup;
  private _email: FormControl;
  private _password: FormControl;
  private _signupButtonDisable: boolean;
  private _errorMessage: string;

  constructor(private _authService: AuthService,
              private _errorService: ErrorService,
              private _urlService: RestfulUrlService,
              private _http: HttpClient,
              private _router: Router,
              private _fb: FormBuilder,
              private _config: AppConfig
  ) {}

  ngOnInit(): void {
    this._signupButtonDisable = false;
    this._errorMessage = "";
    this.initForm();
  }

  private initForm() {
    this._email = new FormControl( '', Validators.required);
    this._password = new FormControl( '', Validators.required);
    this._loginForm = this._fb.group({
      email: this._email,
      password: this._password
    });
  }

  private login(){
    if( this.checkAllConditionPassed()){
      return;
    }
    this._errorMessage = "";
    this._loginForm.disable();
    this._signupButtonDisable = true;
    const headerInfo: HttpHeaders = new HttpHeaders( { authorization : "Basic " + btoa( this._email.value + ":" + this._password.value), 'X-Requested-With':'XMLHttpRequest'});
    this._http.get( this._urlService.login , { headers: headerInfo})
      .subscribe( (data: HttpResponse<any>) => this.afterLogin( data, this._router), (err: HttpErrorResponse) => this.afterError( err, this._router));
  }

  private afterLogin( data: any, router: Router) {
    this.inputAndButtonEnable();
    this._authService.setLocalStorageUser( data);
    router.navigate( ['/']);
  }

  private afterError( err: HttpErrorResponse, router: Router) {
    this.inputAndButtonEnable();
    this._errorMessage = this._errorService.MESSAGE_ID_PW_NOT_MATCH;
    this._errorService.reportError( err, this._email.value + " and PW");
    router.navigate( ['/login']);
  }

  private checkAllConditionPassed(){
    return !this._loginForm.valid;
  }

  private inputAndButtonEnable(){
    this._loginForm.enable();
    this._signupButtonDisable = false;
  }
}
