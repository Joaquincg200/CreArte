package com.example.CreArte.Service;

import com.example.CreArte.Dto.ProductsDTO;
import com.example.CreArte.Entity.Products;
import com.example.CreArte.Entity.Users;
import com.example.CreArte.Mapper.IMapperProducts;
import com.example.CreArte.Repository.IRepositoryProducts;
import com.example.CreArte.Repository.IRepositoryUsers;
import com.example.CreArte.Request.CreateProductRequest;
import com.example.CreArte.exception.ExceptionProductsNotFound;
import com.example.CreArte.exception.ExceptionUsersNotFound;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProductsServiceImpls implements IProductsServiceImpls {
    private IMapperProducts mapperProducts;
    private IRepositoryProducts repositoryProducts;
    private IRepositoryUsers repositoryUsers;


    public ProductsServiceImpls(IMapperProducts mapperProducts, IRepositoryProducts repositoryProducts, IRepositoryUsers repositoryUsers) {
        this.mapperProducts = mapperProducts;
        this.repositoryProducts = repositoryProducts;
        this.repositoryUsers = repositoryUsers;
    }

    @Override
    public ProductsDTO newProduct(CreateProductRequest request) {
        Optional<Users> usersOptional = this.repositoryUsers.findById(request.getUserId());

        Products product = new Products();
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setCategory(request.getCategory());
        product.setStock(request.getStock());

        if(usersOptional.isPresent()){
            product.setIdUser(usersOptional.get());
        }

        product.setImage(request.getImage());
        product.setCreatedAt(LocalDate.now());
        product.setUpdatedAt(LocalDate.now());
        Products savedProduct = this.repositoryProducts.save(product);
        return this.mapperProducts.productToProductDTO(savedProduct);
    }

    @Override
    public ProductsDTO updateProduct(CreateProductRequest request, long id) {
        Optional<Products> optionalProduct = this.repositoryProducts.findById(id);
        if(optionalProduct.isPresent()){
            Products products = optionalProduct.get();
            products.setPrice(request.getPrice());
            products.setStock(request.getStock());
            products.setUpdatedAt(LocalDate.now());
            Products savedProduct = this.repositoryProducts.save(products);
            return this.mapperProducts.productToProductDTO(savedProduct);
        }
        throw new ExceptionProductsNotFound("Producto no encontrado con id: " + id);
    }

    @Override
    public ProductsDTO deleteProduct(long id) {
        Optional<Products> optionalProduct = this.repositoryProducts.findById(id);
        if(optionalProduct.isPresent()){
            Products products = optionalProduct.get();
            this.repositoryProducts.delete(products);
            return this.mapperProducts.productToProductDTO(products);
        }
        throw new ExceptionProductsNotFound("Producto no encontrado con id: " + id);
    }

    @Override
    public List<ProductsDTO> getAllProducts() {
        return this.mapperProducts.productsToProductsDTO(this.repositoryProducts.findAll());
    }

    @Override
    public List<ProductsDTO> getProductsByUserId(long idUser) {
        List<Products> listProductsUser = this.repositoryProducts.findByIdUser_Id(idUser);
        if (!listProductsUser.isEmpty()) {
            return this.mapperProducts.productsToProductsDTO(listProductsUser);
        }
        throw new ExceptionUsersNotFound("El usuario con id: " + idUser + " no tiene productos creados");
    }

    @Override
    public List<ProductsDTO> getProductsByCategory(String category) {
        List<Products> ListProductsCategory = this.repositoryProducts.findByCategory(category);
        if (!ListProductsCategory.isEmpty()) {
            return this.mapperProducts.productsToProductsDTO(ListProductsCategory);
        }
        return List.of();
    }

    @Override
    public List<ProductsDTO> searchProducts(String keyword) {
        List<Products> ListProductsKeyword = this.repositoryProducts.findByNameContainingIgnoreCase(keyword);
        if (!ListProductsKeyword.isEmpty()) {
            return this.mapperProducts.productsToProductsDTO(ListProductsKeyword);
        }
        return List.of();
    }

    @Override
    public ProductsDTO getProductById(long id) {
        Optional<Products> optionalProduct = this.repositoryProducts.findById(id);
        if (optionalProduct.isPresent()) {
            Products products = optionalProduct.get();
            return this.mapperProducts.productToProductDTO(products);
        }else{
            throw new ExceptionProductsNotFound("Producto no encontrado con id: " + id);
        }
    }

    @Override
    public List<ProductsDTO> getFilteredRandomProducts(String category, Double minPrice, Double maxPrice) {

        // Obtener productos filtrados
        List<Products> filtered = this.repositoryProducts.filterRandomProducts(category, minPrice, maxPrice);

        // Debug: imprimir cuántos productos se encontraron
        System.out.println("Filtered products count: " + filtered.size());

        // Mezclar aleatoriamente
        Collections.shuffle(filtered);

        // Tomar hasta 4 productos
        List<Products> products = filtered.stream()
                .limit(4)
                .collect(Collectors.toList());

        // Mapear a DTOs y devolver
        return this.mapperProducts.productsToProductsDTO(products);
    }



}
