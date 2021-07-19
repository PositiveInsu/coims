package ca.joyfactory.coims.exception;

import ca.joyfactory.coims.common.CoimsMessages;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Created by Joinsu on 2018-07-26.
 */
@ResponseStatus( HttpStatus.BAD_REQUEST)
public class NotFoundUserException extends RuntimeException {

    private String findArgument;

    public NotFoundUserException( String findArgument) {
        this.findArgument = findArgument;
    }

    public NotFoundUserException( Throwable e, String findArgument) {
        super( e);
        this.findArgument = findArgument;
    }

    @Override
    public String getMessage() {
        StringBuilder sb = new StringBuilder();
        sb.append( CoimsMessages.NOT_FOUND_USER + this.findArgument);
        return sb.toString();
    }

}
