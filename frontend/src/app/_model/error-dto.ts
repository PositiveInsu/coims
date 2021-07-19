/**
 * Created by Joinsu on 2018-07-26.
 */
export class ErrorDto{
  private message: string;
  private issuedTime: string;
  private uri: string;
  private code: string;
  private evidence: any;

  get getMessage(): string {
    return this.message;
  }

  set setMessage(value: string) {
    this.message = value;
  }

  get getIssuedTime(): string {
    return this.issuedTime;
  }

  set setIssuedTime(value: string) {
    this.issuedTime = value;
  }

  get getUri(): string {
    return this.uri;
  }

  set setUri(value: string) {
    this.uri = value;
  }

  get getCode(): string {
    return this.code;
  }

  set setCode(value: string) {
    this.code = value;
  }

  get getEvidence(): any {
    return this.evidence;
  }

  set setEvidence(value: any) {
    this.evidence = value;
  }
}
