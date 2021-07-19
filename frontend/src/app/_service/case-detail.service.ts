import {Injectable} from "@angular/core";
import {CaseDetailContractComponent} from "../case/detail/content/case-detail-contract.component";
import {CaseStatusType} from "../_model/case-status-type";
import {Subject, BehaviorSubject} from "rxjs";
/**
 * Created by Joinsu on 2019-05-02.
 */
@Injectable()
export class CaseDetailService {

  private _isReadyStatusChange: Subject<boolean> = new BehaviorSubject<boolean>( false);

  get isReadyStatusChange(): Subject<boolean> {
    return this._isReadyStatusChange;
  }

  changeReadyStatus(flag: boolean): void{
    this._isReadyStatusChange.next( flag);
  }
}
