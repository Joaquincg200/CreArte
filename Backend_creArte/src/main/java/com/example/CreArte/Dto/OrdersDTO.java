package com.example.CreArte.Dto;

import com.example.CreArte.Enums.StatusEnum;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.JoinColumn;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;

import java.time.LocalDate;
import java.util.List;

@ToString
@Data
public class OrdersDTO {
    private long id;
    @Schema(description = "Relacion entre el pedido y el usuario", example = "1")
    private long idUser;
    @Schema(description = "Relacion entre el pedido y los productos", example = "[1, 2, 3]")
    private List<Long> idProducts;
    @Schema(description = "Fecha del pedido", example = "16/02/2026")
    private LocalDate order_Date;
    @Schema(description = "Estado del pedido", example = "PENDIENTE")
    private StatusEnum status;
    @Schema(description = "Precio total del pedido", example = "20.43")
    private double total;
}
