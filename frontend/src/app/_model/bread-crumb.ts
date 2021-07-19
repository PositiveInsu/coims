/**
 * Created by Joinsu on 2018-08-03.
 */
export class BreadCrumb {

  constructor(private _name: string,
              private _link: string)
  {}

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get link(): string {
    return this._link;
  }

  set link(value: string) {
    this._link = value;
  }
}
