/**
 * Created by Joinsu on 2017-05-12.
 */
import {Component, OnInit, AfterViewInit}        from "@angular/core";
import {SignupService}    from "../_service/signup.service";
import {Router} from "@angular/router";
import {SignupComponent} from "./signup.component";
@Component({
  selector: 'coims-signup-complete',
  styleUrls: ['./signup-complete.component.css'],
  templateUrl: './signup-complete.component.html'
})
export class SignupCompleteComponent implements OnInit, AfterViewInit{

  constructor(private _signupService: SignupService,
              private _router: Router,
              private _parent: SignupComponent
  ){}

  ngOnInit(): void {
    this.initProgressBar();
    this.removeConsultantObj();
  }

  ngAfterViewInit(): void {
    this._parent.cdref.detectChanges();
  }

  private initProgressBar() {
    this._signupService.progressBarObj.currentStep = 4;
  }

  private removeConsultantObj() {
    this._signupService.deleteConsultantObj();
  }
}
