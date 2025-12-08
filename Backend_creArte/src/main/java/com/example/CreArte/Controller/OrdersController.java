package com.example.CreArte.Controller;

import com.example.CreArte.Dto.OrdersDTO;
import com.example.CreArte.Request.CreateOrderRequest;
import com.example.CreArte.Request.UpdateStatusRequest;
import com.example.CreArte.Service.OrdersServiceImpls;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class OrdersController {
    private OrdersServiceImpls ordersServiceImpls;

    private OrdersController(OrdersServiceImpls ordersServiceImpls) {
        this.ordersServiceImpls = ordersServiceImpls;
    }

    @PostMapping("/api/orders/new")
    @Operation()
    public ResponseEntity<OrdersDTO> createOrder(@RequestBody CreateOrderRequest newOrder) {
        return ResponseEntity.status(HttpStatus.CREATED).body(this.ordersServiceImpls.createOrder(newOrder));
    }

    @PutMapping("/api/orders/update/{id}")
    @Operation()
    public ResponseEntity<OrdersDTO> changeOrderStatus(@RequestBody UpdateStatusRequest order, @PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(this.ordersServiceImpls.changeOrderStatus(id, order));
    }

    @GetMapping("/api/orders/{id}")
    @Operation()
    public ResponseEntity<OrdersDTO> getOrderById(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(this.ordersServiceImpls.getOrderById(id));
    }

    @GetMapping("/api/orders/user/{userId}")
    @Operation()
    public ResponseEntity<List<OrdersDTO>> getOrderByUserId(@PathVariable Long userId) {
        return ResponseEntity.status(HttpStatus.OK).body(this.ordersServiceImpls.getOrderByUserId(userId));
    }

    @PutMapping("/api/orders/cancel/{id}")
    @Operation()
    public ResponseEntity<OrdersDTO> cancelOrder(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(this.ordersServiceImpls.cancelOrder(id));
    }

    @GetMapping("/api/orders/buyer/{idBuyer}")
    @Operation()
    public ResponseEntity<List<OrdersDTO>> getOrderByIdBuyer(@PathVariable Long idBuyer) {
        return ResponseEntity.status(HttpStatus.OK).body(this.ordersServiceImpls.getOrderByIdBuyer(idBuyer));
    }


}
