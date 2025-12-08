package com.example.CreArte.Entity;

import com.example.CreArte.Enums.StatusEnum;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;
import java.time.LocalDate;
import java.util.List;


@Entity
@Table (name = "Orders")
@Data
@ToString
public class Orders {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne
    @JoinColumn (name = "idUser", referencedColumnName = "id")
    private Users idUser;
    @ManyToOne
    @JoinColumn(name = "buyer")
    private Users buyer;
    @ManyToMany
    @JoinTable (
            name = "Order_Products",
            joinColumns = @JoinColumn(name = "idOrder", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "idProducts", referencedColumnName = "id")
    )
    private List<Products> idProducts;
    private LocalDate order_Date;
    @Enumerated(EnumType.STRING)
    private StatusEnum status;
    private double total;
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItem> items;


    private String name;
    private String lastname;
    private String phone;
    private String address;
    private String number;
    private String floor;
    private String city;
    private String postalCode;

    public Orders(long id, Users idUser, Users buyer, List<Products> idProducts, LocalDate order_Date, StatusEnum status, double total, List<OrderItem> items, String name, String lastname, String phone, String address, String number, String floor, String city, String postalCode) {
        this.id = id;
        this.idUser = idUser;
        this.buyer = buyer;
        this.idProducts = idProducts;
        this.order_Date = order_Date;
        this.status = status;
        this.total = total;
        this.items = items;
        this.name = name;
        this.lastname = lastname;
        this.phone = phone;
        this.address = address;
        this.number = number;
        this.floor = floor;
        this.city = city;
        this.postalCode = postalCode;
    }

    public Orders() {

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Users getIdUser() {
        return idUser;
    }

    public void setIdUser(Users idUser) {
        this.idUser = idUser;
    }

    public Users getBuyer() {
        return buyer;
    }

    public void setBuyer(Users buyer) {
        this.buyer = buyer;
    }

    public List<Products> getIdProducts() {
        return idProducts;
    }

    public void setIdProducts(List<Products> idProducts) {
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

    public List<OrderItem> getItems() {
        return items;
    }

    public void setItems(List<OrderItem> items) {
        this.items = items;
    }

    public void setOrderItems(List<OrderItem> orderItems) {
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
