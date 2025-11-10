package com.example.CreArte.Request;

import com.example.CreArte.Enums.StatusEnum;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDate;
import java.util.List;

public class CreateOrderRequest {
    private long idUser;
    private List<Long> idProducts;
    private LocalDate order_Date;
    private StatusEnum status;
    private double total;
    private List<OrderItemsRequest> orderItems;

    public CreateOrderRequest(long idUser, List<Long> idProducts, LocalDate order_Date, StatusEnum status, double total, List<OrderItemsRequest> orderItems) {
        this.idUser = idUser;
        this.idProducts = idProducts;
        this.order_Date = order_Date;
        this.status = status;
        this.total = total;
    }

    public CreateOrderRequest() {

    }

    public long getIdUser() {
        return idUser;
    }

    public void setIdUser(long idUser) {
        this.idUser = idUser;
    }

    public List<Long> getIdProducts() {
        return idProducts;
    }

    public void setIdProducts(List<Long> idProducts) {
        this.idProducts = idProducts;
    }

    public LocalDate getOrder_Date() {
        return order_Date;
    }

    public void setOrder_Date(LocalDate order_Date) {
        this.order_Date = order_Date;
    }

    public StatusEnum getStatus() {
        return status;
    }

    public void setStatus(StatusEnum status) {
        this.status = status;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public List<OrderItemsRequest> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderItemsRequest> orderItems) {
        this.orderItems = orderItems;
    }


}
