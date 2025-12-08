package com.example.CreArte.Service;

import com.example.CreArte.Dto.ProductsDTO;
import com.example.CreArte.Request.CreateProductRequest;

import java.util.List;

public interface IProductsServiceImpls {
    ProductsDTO newProduct(CreateProductRequest request);
    ProductsDTO updateProduct(CreateProductRequest request, long id);
    ProductsDTO deleteProduct(long id);
    List<ProductsDTO> getAllProducts();
    List<ProductsDTO> getProductsByUserId(long userId);
    List<ProductsDTO> getProductsByCategory(String category);
    List<ProductsDTO> searchProducts(String keyword);
    ProductsDTO getProductById(long id);
    List<ProductsDTO> getFilteredRandomProducts(String category, Double minPrice, Double maxPrice);






}
