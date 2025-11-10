package com.example.CreArte.Dto;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;

public class ReviewsDTO {
    private long id;
    @Schema(description = "Comentario de la reseña", example = "Muy buen producto")
    private String comment;
    @Schema(description = "Calificación de la reseña", example = "5")
    private int rating;
    @Schema(description = "ID del producto relacionado", example = "1")
    private long productId;
    @Schema(description = "ID del usuario que hizo la reseña", example = "1")
    private long userId;
    @Schema(description = "Indica si la compra fue verificada", example = "true")
    private boolean verifiedPurchase;
    @Schema(description = "Fecha y hora de creación de la reseña", example = "2024-01-01T12:00:00")
    private LocalDateTime createdAt;

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

    public long getProductId() {
        return productId;
    }

    public void setProductId(long productId) {
        this.productId = productId;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
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
