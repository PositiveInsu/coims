/**
 * Created by Joinsu on 2018-12-17.
 */
export class CaseGradeType{
  // CaseGrade.java

  private _MAIN: string = "MAIN";
  private _DEPENDENT: string = "DEPENDENT";

  get MAIN(): string {
    return this._MAIN;
  }

  get DEPENDENT(): string {
    return this._DEPENDENT;
  }
}
