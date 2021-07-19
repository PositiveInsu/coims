package ca.joyfactory.coims.common;

import org.springframework.stereotype.Component;

import java.util.Date;

/**
 * Created by Joinsu on 2018-07-24.
 */
@Component
public class ErrorResponse {

    private Date errorTime;
    private String message;
    private String uri;
    private long code;

    public Date getErrorTime() {
        return errorTime;
    }

    public String getMessage() {
        return message;
    }

    public long getCode() {
        return code;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setErrorTime(Date errorTime) {
        this.errorTime = errorTime;
    }

    public void setCode(long code) {
        this.code = code;
    }

    public String getUri() {
        return uri;
    }

    public void setUri(String uri) {
        this.uri = uri;
    }
}
