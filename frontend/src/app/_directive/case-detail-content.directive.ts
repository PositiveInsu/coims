import {Directive, ViewContainerRef} from "@angular/core";
/**
 * Created by Joinsu on 2019-05-02.
 */
@Directive({
  selector: '[case-detail-content]',
})
export class CaseDetailContentDirective{

  constructor(public viewContainerRef: ViewContainerRef){}
}
