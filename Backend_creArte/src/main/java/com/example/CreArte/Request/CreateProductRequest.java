package com.example.CreArte.Request;

import com.example.CreArte.Enums.CategoryEnum;

public class CreateProductRequest {
    private String name;
    private String description;
    private double price;
    private CategoryEnum category;
    private int stock;
    private String image;
    private long userId;

    public CreateProductRequest(String name, String description, double price, CategoryEnum category, int stock, String image, long userId) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.stock = stock;
        this.image = image;
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public CategoryEnum getCategory() {
        return category;
    }

    public void setCategory(CategoryEnum category) {
        this.category = category;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }
}
