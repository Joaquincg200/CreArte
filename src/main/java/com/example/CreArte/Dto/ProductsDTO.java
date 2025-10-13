package com.example.CreArte.Dto;

import com.example.CreArte.Entity.Users;
import com.example.CreArte.Enums.CategoryEnum;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.JoinColumn;
import lombok.Data;
import lombok.ToString;

import java.time.LocalDate;

@ToString
@Data
public class ProductsDTO {
    private long id;
    @Schema(description = "Relacion entre el producto y el usuario", example = "1")
    private long idUser;
    @Schema(description = "Nombre del producto", example = "Jarron")
    private String name;
    @Schema(description = "Descripcion del producto", example = "Es de arcilla")
    private String description;
    @Schema(description = "Precio del producto", example = "9,99")
    private double price;
    @Schema(description = "Categoria del producto", example = "CERAMICA")
    private CategoryEnum category;
    @Schema(description = "Cantidad del producto", example = "10")
    private int stock;
    @Schema(description = "Imagen del producto", example = "imagen.jpg")
    private String image;
    @Schema(description = "Fecha de creacion del producto", example = "12/01/2027")
    private LocalDate createdAt;
    @Schema(description = "Fecha de actualizacion del producto", example = "12/01/2027")
    private LocalDate updatedAt;


}
