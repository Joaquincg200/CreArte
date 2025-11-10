package com.example.CreArte.Request;

import com.example.CreArte.Enums.StatusEnum;

public class UpdateStatusRequest {
    private StatusEnum status;

    public StatusEnum getStatus() {
        return status;
    }

    public void setStatus(StatusEnum status) {
        this.status = status;
    }
}
