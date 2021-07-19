package ca.joyfactory.coims.exception;

import ca.joyfactory.coims.common.CoimsMessages;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Created by Joinsu on 2018-07-24.
 */
@ResponseStatus( HttpStatus.BAD_REQUEST)
public class DuplicateUserException extends RuntimeException {

    private String userEmail;

    public DuplicateUserException(Throwable cause, String userEmail) {
        super( cause);
        this.userEmail = userEmail;
    }

    public DuplicateUserException(String userEmail) {
        this.userEmail = userEmail;
    }

    @Override
    public String getMessage() {
        StringBuilder sb = new StringBuilder();
        sb.append( CoimsMessages.DUPLICATE_USER + this.userEmail);
        return sb.toString();
    }
}
