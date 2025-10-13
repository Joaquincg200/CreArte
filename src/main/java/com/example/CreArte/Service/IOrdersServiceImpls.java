package com.example.CreArte.Service;

import com.example.CreArte.Dto.OrdersDTO;
import com.example.CreArte.Request.CreateOrderRequest;

import java.util.List;

public interface IOrdersServiceImpls {
    OrdersDTO createOrder(CreateOrderRequest request);
    OrdersDTO getOrderById(Long id);
    List<OrdersDTO> getOrderByUserId(Long userId);
    OrdersDTO changeOrderStatus(Long id, CreateOrderRequest request);
    OrdersDTO cancelOrder(Long id, CreateOrderRequest request);



}
