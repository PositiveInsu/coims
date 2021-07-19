package ca.joyfactory.coims.controller;

import ca.joyfactory.coims.exception.*;
import ca.joyfactory.coims.service.ExceptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

/**
 * Created by Joinsu on 2018-07-24.
 */
@ControllerAdvice
public class RestExceptionController {

    @Autowired
    private ExceptionService exceptionService;

    @ExceptionHandler( DuplicateUserException.class)
    public ResponseEntity duplicateUserException( DuplicateUserException e, WebRequest webRequest){
        return new ResponseEntity( exceptionService.executeLogging( e, webRequest), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler( NotFoundUserException.class)
    public ResponseEntity notFoundUserException( NotFoundUserException e, WebRequest webRequest){
        return new ResponseEntity( exceptionService.executeLogging( e, webRequest), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler( NotFoundDataException.class)
    public ResponseEntity notFoundDataException( NotFoundDataException e, WebRequest webRequest){
        return new ResponseEntity( exceptionService.executeLogging( e, webRequest), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler( FileControlException.class)
    public ResponseEntity fileControlException( FileControlException e, WebRequest webRequest){
        return new ResponseEntity( exceptionService.executeLogging( e, webRequest), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler( ArgumentException.class)
    public ResponseEntity argumentException( ArgumentException e, WebRequest webRequest){
        return new ResponseEntity( exceptionService.executeLogging( e, webRequest), HttpStatus.BAD_REQUEST);
    }
}

