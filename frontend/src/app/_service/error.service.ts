import {Injectable} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {ErrorDto} from "../_model/error-dto";
/**
 * Created by Joinsu on 2018-07-26.
 */
@Injectable()
export class ErrorService{

  constructor(){}

  MESSAGE_ID_PW_NOT_MATCH: string = "ID and password do not match. Please try again.";

  public reportError( errorObj: HttpErrorResponse, evidence: any): void{
    let errorDto :ErrorDto = this.createErrorDto( errorObj, evidence);
    this.consoleError( errorDto);
  };

  public reportErrorJustMessage( message: string): void{
    console.error( "Operation Error : " + message);
  }

  public reportErrorObj( valueObj: any): void{
    console.error( valueObj);
  }

  private createErrorDto( errorObj: HttpErrorResponse, evidence: any): ErrorDto {
    let errorDto :ErrorDto = new ErrorDto();
    if( errorObj.error){
      errorDto.setCode = errorObj.error.code;
      errorDto.setIssuedTime = errorObj.error.errorTime;
      errorDto.setMessage = errorObj.error.message;
      errorDto.setUri = errorObj.error.uri;
      errorDto.setEvidence = evidence;
    }else{
      errorDto.setCode = errorObj.status + '';
      errorDto.setMessage = errorObj.message;
      errorDto.setEvidence = evidence;
    }
    return errorDto;
  }

  private consoleError(errorDto: ErrorDto) {
    console.error( "[" + errorDto.getCode + "] " + errorDto.getMessage);
    console.error( errorDto.getEvidence);
  }
}
