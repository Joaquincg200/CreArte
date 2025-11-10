package com.example.CreArte.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class ExceptionUsersAlredyExists extends RuntimeException {
    public ExceptionUsersAlredyExists(String message) {
        super(message);
    }
}
