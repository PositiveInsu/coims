import {Directive, ViewContainerRef} from "@angular/core";
/**
 * Created by Joinsu on 2019-04-02.
 */
@Directive({
  selector: '[case-new-fee-dependent]',
})
export class CaseNewFeeDependentDirective{

  constructor(public viewContainerRef: ViewContainerRef){}
}
