/**
 * Created by Joinsu on 2018-12-06.
 */
export class CaseDocumentType{

  private _PERSONAL: string = "PERSONAL";
  private _EDUCATION: string = "EDUCATION";
  private _WORK: string = "WORK";
  private _VISA_HISTORY: string = "VISA_HISTORY";
  private _PREVIOUS_STAY: string = "PREVIOUS_STAY";
  private _RELATIVE_FRIEND: string = "RELATIVE_FRIEND";
  private _LANGUAGE: string = "LANGUAGE";
  private _NETWORTH: string = "NETWORTH";
  private _UNDER18: string = "UNDER18";
  private _CRIMINAL: string = "CRIMINAL";
  private _OTHER: string = "OTHER";
  private _APPLICATION: string = "APPLICATION";
  private _ADDITIONAL: string = "ADDITIONAL";
  private _MORE: string = "MORE";

  get PERSONAL(): string {
    return this._PERSONAL;
  }

  get EDUCATION(): string {
    return this._EDUCATION;
  }

  get WORK(): string {
    return this._WORK;
  }

  get VISA_HISTORY(): string {
    return this._VISA_HISTORY;
  }

  get PREVIOUS_STAY(): string {
    return this._PREVIOUS_STAY;
  }

  get RELATIVE_FRIEND(): string {
    return this._RELATIVE_FRIEND;
  }

  get LANGUAGE(): string {
    return this._LANGUAGE;
  }

  get NETWORTH(): string {
    return this._NETWORTH;
  }

  get UNDER18(): string {
    return this._UNDER18;
  }

  get CRIMINAL(): string {
    return this._CRIMINAL;
  }

  get OTHER(): string {
    return this._OTHER;
  }

  get APPLICATION(): string {
    return this._APPLICATION;
  }

  get ADDITIONAL(): string {
    return this._ADDITIONAL;
  }

  get MORE(): string {
    return this._MORE;
  }
}
