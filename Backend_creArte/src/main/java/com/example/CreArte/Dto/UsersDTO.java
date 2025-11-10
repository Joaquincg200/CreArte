package com.example.CreArte.Dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.ToString;
import org.mapstruct.Builder;

import java.time.LocalDate;

@ToString
@Data
public class UsersDTO {
    private long id;
    @Schema(description = "Nombre del usuario", example = "Francisco")
    private String name;
    @Schema(description = "Email del usuario", example = "francisco@gmail.com")
    private String email;
    @Schema(description = "Rol del usuario", example = "COMPRADOR")
    private String role;
    @Schema(description = "Teléfono del usuario", example = "123456789")
    private long phone;
    @Schema(description = "Avatar del usuario", example = "https://i.pravatar.cc")
    private String avatar;
    @Schema(description = "Fecha de registro del usuario", example = "12/01/2027")
    private LocalDate registration_date;
    @Schema(description = "Token de autenticación del usuario", example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")
    private String token;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

}
