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

    public Orders(long id, Users idUser, List<Products> idProducts, LocalDate order_Date, StatusEnum status, double total) {
        this.id = id;
        this.idUser = idUser;
        this.idProducts = idProducts;
        this.order_Date = order_Date;
        this.status = status;
        this.total = total;
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
}
