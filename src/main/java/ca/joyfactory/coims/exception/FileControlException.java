package ca.joyfactory.coims.exception;

import ca.joyfactory.coims.common.CoimsMessages;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Created by Joinsu on 2018-09-27.
 */
@ResponseStatus( HttpStatus.BAD_REQUEST)
public class FileControlException extends RuntimeException{
    String requestInformation;

    public FileControlException( String requestInformation) {
        this.requestInformation = requestInformation;
    }

    public FileControlException( Throwable e, String findArgument) {
        super( e);
        this.requestInformation = findArgument;
    }

    @Override
    public String getMessage() {
        StringBuilder sb = new StringBuilder();
        sb.append( CoimsMessages.FILE_CONTROL_EXCEPTION + this.requestInformation);
        return sb.toString();
    }
}
