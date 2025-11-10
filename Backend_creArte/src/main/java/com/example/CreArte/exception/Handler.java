package com.example.CreArte.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class Handler {
    @ExceptionHandler(ExceptionUsersNotFound.class)
    public ResponseEntity<ErrorResponse> handleCustomException(ExceptionUsersNotFound ex) {
        ErrorResponse error = new ErrorResponse(ex.getMessage(), "Error", 404);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler(ExceptionUsersAlredyExists.class)
    public ResponseEntity<ErrorResponse> handleCustomException(ExceptionUsersAlredyExists ex) {
        ErrorResponse error = new ErrorResponse(ex.getMessage(), "Error", 409);
        return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
    }

    @ExceptionHandler(ExceptionUsersUnauthorized.class)
    public ResponseEntity<ErrorResponse> handleCustomException(ExceptionUsersUnauthorized ex) {
        ErrorResponse error = new ErrorResponse(ex.getMessage(), "Error", 401);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
    }

    @ExceptionHandler(ExceptionProductsNotFound.class)
    public ResponseEntity<ErrorResponse> handleCustomException(ExceptionProductsNotFound ex) {
        ErrorResponse error = new ErrorResponse(ex.getMessage(), "Error", 404);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler(ExceptionNotStock.class)
    public ResponseEntity<ErrorResponse> handleCustomException(ExceptionNotStock ex) {
        ErrorResponse error = new ErrorResponse(ex.getMessage(), "Error", 409);
        return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
    }

    @ExceptionHandler(ExceptionOrderNotFound.class)
    public ResponseEntity<ErrorResponse> handleCustomException(ExceptionOrderNotFound ex) {
        ErrorResponse error = new ErrorResponse(ex.getMessage(), "Error", 404);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler(ExceptionChangeOrderStatus.class)
    public ResponseEntity<ErrorResponse> handleCustomException(ExceptionChangeOrderStatus ex) {
        ErrorResponse error = new ErrorResponse(ex.getMessage(), "Error", 409);
        return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
    }

    @ExceptionHandler(ExceptionReviewsNotFound.class)
    public ResponseEntity<ErrorResponse> handleCustomException(ExceptionReviewsNotFound ex) {
        ErrorResponse error = new ErrorResponse(ex.getMessage(), "Error", 404);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<FieldErrorResponse> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex) {

        Map<String, String> errors = new HashMap<>();
        for(FieldError fieldError: ex.getBindingResult().getFieldErrors()){
            errors.put(fieldError.getField(),fieldError.getDefaultMessage());
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                new FieldErrorResponse(ex.getMessage()
                        ,"Errores de validación de datos de entrada"
                        ,HttpStatus.BAD_REQUEST.value()
                        ,errors));

    }
}
