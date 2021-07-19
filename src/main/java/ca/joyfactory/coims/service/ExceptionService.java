package ca.joyfactory.coims.service;

import ca.joyfactory.coims.common.ErrorResponse;
import ca.joyfactory.coims.domain.ClientCaseStatus;
import ca.joyfactory.coims.exception.NotFoundDataException;
import ch.qos.logback.classic.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.WebRequest;

import java.sql.Timestamp;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

/**
 * Created by Joinsu on 2018-07-25.
 */
@Service
public class ExceptionService {

    private Logger serverLogger = ( Logger) LoggerFactory.getLogger("REST_SERVER_EXCEPTION");
    private Logger webLogger = ( Logger) LoggerFactory.getLogger("REST_WEB_EXCEPTION");
    private String space = " ";

    public static void checkNullData( Object target, String requestArgument) {
        if( target == null){
            throw new NotFoundDataException( requestArgument);
        }
    }

    public static void checkNullData( List<Object> target, String requestArgument) {
        if( target == null || target.size() == 0){
            throw new NotFoundDataException( requestArgument);
        }
    }

    public ErrorResponse executeLogging( Exception e, WebRequest webRequest){
        long uniqueCode = getUniqueCode();

        loggingException( uniqueCode, e);
        loggingWebRequest( uniqueCode, webRequest);

        return getErrorResponseObj( uniqueCode, e, webRequest);
    }

    public ErrorResponse getErrorResponseObj( long uniqueCode, Exception e, WebRequest webRequest) {
        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setCode( uniqueCode);
        errorResponse.setErrorTime( new Date());
        errorResponse.setMessage( e.getMessage());
        errorResponse.setUri( webRequest.getDescription( false));
        return errorResponse;
    }

    private void loggingException(long uniqueCode, Exception e) {
        StringBuilder result = new StringBuilder();

        result.append( "[" + uniqueCode + "]" + space);
        result.append( e.getMessage());

        serverLogger.debug( result.toString(), e);
    }

    private void loggingWebRequest( Long uniqueCode, WebRequest webRequest) {
        StringBuilder result = new StringBuilder();

        result.append( "[" + uniqueCode + "]" + space);
        result.append( "[" + webRequest.getDescription( false) + "]" + space);

        Iterator<String> headerNames = webRequest.getHeaderNames();
        while( headerNames.hasNext()){
            String headerName = headerNames.next();
            result.append( headerName + ":" + webRequest.getHeader( headerName) + "," + space);
        }
        webLogger.debug( result.toString());
    }


    private long getUniqueCode() {
        Timestamp ts = new Timestamp( new Date().getTime());
        return ts.getTime();
    }
}
