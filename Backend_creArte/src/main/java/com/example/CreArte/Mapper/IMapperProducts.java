package com.example.CreArte.Mapper;

import com.example.CreArte.Dto.ProductsDTO;
import com.example.CreArte.Entity.Products;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface IMapperProducts {
    @Mapping(target = "idUser", source = "idUser.id")
    ProductsDTO productToProductDTO(Products product);
    List<ProductsDTO> productsToProductsDTO(List<Products> products);

}
