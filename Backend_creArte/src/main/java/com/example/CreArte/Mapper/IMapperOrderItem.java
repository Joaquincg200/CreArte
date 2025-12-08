package com.example.CreArte.Mapper;
import com.example.CreArte.Dto.OrderItemDTO;
import com.example.CreArte.Entity.OrderItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface IMapperOrderItem {
    @Mapping(target = "productId", source = "product.id")
    @Mapping(target = "productName", source = "product.name")
    @Mapping(target = "productImg", source = "product.image")
    @Mapping(target = "price", source = "product.price")
    @Mapping(target = "sellerId", source = "product.idUser.id")
    OrderItemDTO orderItemToDTO(OrderItem item);

    List<OrderItemDTO> orderItemsToDTOs(List<OrderItem> items);
}


