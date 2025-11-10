package com.example.CreArte.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class ExceptionUsersUnauthorized extends RuntimeException {
    public ExceptionUsersUnauthorized(String message) {
        super(message);
    }
}
