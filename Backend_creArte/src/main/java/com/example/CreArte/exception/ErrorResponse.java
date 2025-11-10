package com.example.CreArte.exception;

import lombok.Data;

@Data
public class ErrorResponse {
    private String message;
    private String details;
    private int error;

    public ErrorResponse() {
    }

    public ErrorResponse(String message, String details, int error) {
        this.message = message;
        this.details = details;
        this.error = error;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public int getError() {
        return error;
    }

    public void setError(int error) {
        this.error = error;
    }
}
