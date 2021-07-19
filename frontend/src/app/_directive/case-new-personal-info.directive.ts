import {Directive, ViewContainerRef} from "@angular/core";
/**
 * Created by Joinsu on 2019-02-08.
 */

@Directive({
  selector: '[case-new-personal-info-dependent]',
})
export class CaseNewPersonalInfoDependentDirective{

  constructor(public viewContainerRef: ViewContainerRef){}
}
