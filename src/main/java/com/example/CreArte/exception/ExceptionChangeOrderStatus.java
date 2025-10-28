package com.example.CreArte.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class ExceptionChangeOrderStatus extends RuntimeException {
    public ExceptionChangeOrderStatus(String message) {
        super(message);
    }
}
