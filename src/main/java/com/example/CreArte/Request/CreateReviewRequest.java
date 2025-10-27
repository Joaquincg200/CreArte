package com.example.CreArte.Request;

import java.time.LocalDateTime;

public class CreateReviewRequest {
    private String comment;
    private int rating;
    private long productId;
    private long userId;
    private boolean verifiedPurchase;
    private LocalDateTime createdAt;

    public CreateReviewRequest() {
    }

    public CreateReviewRequest(String comment, int rating, long productId, long userId, boolean verifiedPurchase, LocalDateTime createdAt) {
        this.comment = comment;
        this.rating = rating;
        this.productId = productId;
        this.userId = userId;
        this.verifiedPurchase = verifiedPurchase;
        this.createdAt = createdAt;
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
