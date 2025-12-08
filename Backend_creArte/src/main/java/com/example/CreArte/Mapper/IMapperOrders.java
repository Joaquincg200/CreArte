package com.example.CreArte.Mapper;

import com.example.CreArte.Dto.OrdersDTO;
import com.example.CreArte.Entity.Orders;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring", uses = IMapperOrderItem.class)
public interface IMapperOrders {
    @Mapping(target = "idUser", source = "idUser.id")
    @Mapping(target = "buyer", source = "buyer.id")
    @Mapping(target = "items", source = "items")
    @Mapping(target = "buyerName", source = "buyer.name")

    @Mapping(target = "name", source = "name")
    @Mapping(target = "lastname", source = "lastname")
    @Mapping(target = "phone", source = "phone")
    @Mapping(target = "address", source = "address")
    @Mapping(target = "number", source = "number")
    @Mapping(target = "floor", source = "floor")
    @Mapping(target = "city", source = "city")
    @Mapping(target = "postalCode", source = "postalCode")

    OrdersDTO orderToOrderDTO(Orders order);

    List<OrdersDTO> ordersToOrdersDTO(List<Orders> orders);
}
