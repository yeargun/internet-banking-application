//package com.yeargun.questionservice.config;
//
//import org.springframework.http.HttpStatus;
//import org.springframework.web.bind.annotation.ExceptionHandler;
//import org.springframework.web.bind.annotation.ResponseStatus;
//import org.springframework.web.bind.annotation.RestControllerAdvice;
//
//@RestControllerAdvice
//public class ApplicationExceptionHandler {
//
//    @ExceptionHandler(RuntimeException.class)
//    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
//    public ErrorDTO processRuntimeException(RuntimeException e) {
//        return createErrorDTO(HttpStatus.INTERNAL_SERVER_ERROR, "An internal server error has occurred",e);
//    }
//
//    private ErrorDTO createErrorDTO(HttpStatus status, String message, Exception e){
//        return new ErrorDTO(status, e.getLocalizedMessage()+"-"+message);
//    }
//}
