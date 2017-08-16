/**
 * Created by Joinsu on 2017-05-12.
 */
import {Component, OnInit}        from "@angular/core";
import {SignupService}    from "../_service/signup.service";
import {Router} from "@angular/router";
@Component({
  selector: 'coims-signup-complete',
  styleUrls: ['./signup-complete.component.css'],
  templateUrl: './signup-complete.component.html'
})
export class SignupCompleteComponent implements OnInit{

  constructor(private signupService: SignupService,
              private router: Router
  ){}

  ngOnInit(): void {
    this.initProgressBar();
  }

  private initProgressBar() {
    this.signupService.progressBarObj.currentStep = 4;
  }
}
