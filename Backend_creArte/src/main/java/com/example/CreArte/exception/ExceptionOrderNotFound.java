package com.example.CreArte.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ExceptionOrderNotFound extends RuntimeException {
    public ExceptionOrderNotFound(String message) {
        super(message);
    }
}
