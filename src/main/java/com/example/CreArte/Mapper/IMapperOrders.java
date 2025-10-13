package com.example.CreArte.Mapper;

import com.example.CreArte.Dto.OrdersDTO;
import com.example.CreArte.Entity.Orders;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface IMapperOrders {
    @Mapping(target = "idUser", source = "idUser.id")
    @Mapping(target = "idProducts", expression = "java(order.getIdProducts().stream().map(p -> p.getId()).toList())")
    OrdersDTO orderToOrderDTO(Orders order);
    List<OrdersDTO> ordersToOrdersDTO(List<Orders> orders);
}
