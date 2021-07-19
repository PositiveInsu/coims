import {Directive, ViewContainerRef} from "@angular/core";
/**
 * Created by Joinsu on 2019-04-09.
 */
@Directive({
  selector: '[case-new-document-dependent]',
})
export class CaseNewDocumentDependentDirective{

  constructor(public viewContainerRef: ViewContainerRef){}
}
