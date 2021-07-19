package ca.joyfactory.coims.exception;

import ca.joyfactory.coims.common.CoimsMessages;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Created by Joinsu on 2019-04-27.
 */
@ResponseStatus( HttpStatus.BAD_REQUEST)
public class ArgumentException extends RuntimeException {
    private String causeInformation;

    public ArgumentException(String message, String casuseInformation) {
        super(message);
        this.causeInformation = casuseInformation;
    }

    @Override
    public String getMessage() {
        StringBuilder sb = new StringBuilder();
        sb.append( CoimsMessages.ARGUMENT_ERROR + this.causeInformation);
        return sb.toString();
    }
}
