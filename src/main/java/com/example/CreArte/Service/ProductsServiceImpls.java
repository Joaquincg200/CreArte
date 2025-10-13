package com.example.CreArte.Service;

import com.example.CreArte.Dto.ProductsDTO;
import com.example.CreArte.Entity.Products;
import com.example.CreArte.Entity.Users;
import com.example.CreArte.Mapper.IMapperProducts;
import com.example.CreArte.Repository.IRepositoryProducts;
import com.example.CreArte.Repository.IRepositoryUsers;
import com.example.CreArte.Request.CreateProductRequest;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

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
        Optional<Users> userId = this.repositoryUsers.findById(request.getUserId());

        Products product = new Products();
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setCategory(request.getCategory());
        product.setStock(request.getStock());

        if(!userId.isEmpty()){
            product.setIdUser(userId.get());
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
            products.setName(request.getName());
            products.setDescription(request.getDescription());
            products.setPrice(request.getPrice());
            products.setCategory(request.getCategory());
            products.setStock(request.getStock());
            products.setImage(request.getImage());
            products.setUpdatedAt(LocalDate.now());
            Products savedProduct = this.repositoryProducts.save(products);
            return this.mapperProducts.productToProductDTO(savedProduct);
        }
        return null;
    }

    @Override
    public ProductsDTO deleteProduct(long id) {
        Optional<Products> optionalProduct = this.repositoryProducts.findById(id);
        if(optionalProduct.isPresent()){
            Products products = optionalProduct.get();
            this.repositoryProducts.delete(products);
            return this.mapperProducts.productToProductDTO(products);
        }
        return null;
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
        return List.of();
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
    public void updateStockAfterOrder(Long productId, int quantityPurchased) {
        Optional<Products> optionalProduct = this.repositoryProducts.findById(productId);
        if (optionalProduct.isPresent()) {
            Products product = optionalProduct.get();
            int newStock = product.getStock() - quantityPurchased;
            product.setStock(newStock);
            this.repositoryProducts.save(product);
        }
    }


}
