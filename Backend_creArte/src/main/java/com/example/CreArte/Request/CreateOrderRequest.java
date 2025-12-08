package com.example.CreArte.Request;
import java.util.List;

public class CreateOrderRequest {
    private long idUser;
    private long buyer;
    private List<OrderItemsRequest> orderItems;

    private String name;
    private String lastname;
    private String phone;
    private String address;
    private String number;
    private String floor;
    private String city;
    private String postalCode;

    public CreateOrderRequest() {}

    public CreateOrderRequest(long idUser, long buyer, List<OrderItemsRequest> orderItems) {
        this.idUser = idUser;
        this.orderItems = orderItems;
        this.buyer = buyer;
    }

    public long getIdUser() {
        return idUser;
    }

    public void setIdUser(long idUser) {
        this.idUser = idUser;
    }

    public long getBuyer() {
        return buyer;
    }

    public void setBuyer(long buyer) {
        this.buyer = buyer;
    }

    public List<OrderItemsRequest> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderItemsRequest> orderItems) {
        this.orderItems = orderItems;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getFloor() {
        return floor;
    }

    public void setFloor(String floor) {
        this.floor = floor;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }
}