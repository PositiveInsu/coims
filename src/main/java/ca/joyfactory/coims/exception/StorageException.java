package ca.joyfactory.coims.exception;

import ca.joyfactory.coims.common.CoimsMessages;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Created by Joinsu on 2019-05-03.
 */
@ResponseStatus( HttpStatus.BAD_REQUEST)
public class StorageException extends RuntimeException{
    String requestInformation;

    public StorageException( String requestInformation) {
        this.requestInformation = requestInformation;
    }

    public StorageException( Throwable e, String requestInformation) {
        super( e);
        this.requestInformation = requestInformation;
    }

    @Override
    public String getMessage() {
        StringBuilder sb = new StringBuilder();
        sb.append( CoimsMessages.STORAGE_EXCEPTION + this.requestInformation);
        return sb.toString();
    }
}
