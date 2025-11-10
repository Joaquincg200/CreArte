package com.example.CreArte.Request;

import com.example.CreArte.Enums.RoleEnum;

public class CreateUserRequest {
    private String name;
    private String email;
    private String password;
    private RoleEnum role;
    private String avatar;
    private long phone;

    public CreateUserRequest(String name, String email, String password, RoleEnum role, String avatar, long phone) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.avatar = avatar;
        this.phone = phone;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public RoleEnum getRole() {
        return role;
    }

    public void setRole(RoleEnum role) {
        this.role = role;
    }

    public String getAvatar() {
        return avatar;
    }
    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public long getPhone() {
        return phone;
    }

    public void setPhone(long phone) {
        this.phone = phone;
    }

}
