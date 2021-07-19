import {Component} from "@angular/core";
import {AppConfig} from "../app.config";
/**
 * Created by Joinsu on 2018-07-29.
 */
@Component({
  selector:'coims-main-footer',
  templateUrl: './main-footer.component.html'
})
export class MainFooterComponent{

  constructor(
    private _config: AppConfig
  ){}
}
