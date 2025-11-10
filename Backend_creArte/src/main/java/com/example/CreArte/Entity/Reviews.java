package com.example.CreArte.Entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "Reviews")
@ToString
@Data
public class Reviews {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String comment;
    private int rating;
    @ManyToOne
    @JoinColumn(name = "productId", referencedColumnName = "id")
    private Products productId;
    @ManyToOne
    @JoinColumn(name = "userId", referencedColumnName = "id")
    private Users userId;
    private boolean verifiedPurchase;
    private LocalDateTime createdAt;

    public Reviews(long id, String comment, int rating, Products productId, Users userId, boolean verifiedPurchase, LocalDateTime createdAt) {
        this.id = id;
        this.comment = comment;
        this.rating = rating;
        this.productId = productId;
        this.userId = userId;
        this.verifiedPurchase = verifiedPurchase;
        this.createdAt = createdAt;
    }

    public Reviews() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public Products getProductId() {
        return productId;
    }

    public void setProductId(Products productId) {
        this.productId = productId;
    }

    public Users getUserId() {
        return userId;
    }

    public void setUserId(Users userId) {
        this.userId = userId;
    }

    public boolean isVerifiedPurchase() {
        return verifiedPurchase;
    }

    public void setVerifiedPurchase(boolean verifiedPurchase) {
        this.verifiedPurchase = verifiedPurchase;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

}
