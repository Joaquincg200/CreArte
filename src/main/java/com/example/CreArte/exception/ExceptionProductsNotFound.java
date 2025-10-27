package com.example.CreArte.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ExceptionProductsNotFound extends RuntimeException {
    public ExceptionProductsNotFound(String message) {
        super(message);
    }
}
