package ca.joyfactory.coims.exception;

import ca.joyfactory.coims.common.CoimsMessages;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Created by Joinsu on 2018-09-05.
 */
@ResponseStatus( HttpStatus.BAD_REQUEST)
public class NotFoundDataException extends RuntimeException {
    String requestInformation;

    public NotFoundDataException( String requestInformation) {
        this.requestInformation = requestInformation;
    }

    public NotFoundDataException( Throwable e, String findArgument) {
        super( e);
        this.requestInformation = findArgument;
    }

    @Override
    public String getMessage() {
        StringBuilder sb = new StringBuilder();
        sb.append( CoimsMessages.NOT_FOUND_DATA + this.requestInformation);
        return sb.toString();
    }
}
