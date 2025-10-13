package com.example.CreArte.Controller;

import com.example.CreArte.Dto.ProductsDTO;
import com.example.CreArte.Request.CreateProductRequest;
import com.example.CreArte.Service.ProductsServiceImpls;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProductsController {
    private ProductsServiceImpls productsServiceImpls;

    public ProductsController(ProductsServiceImpls productsServiceImpls) {
        this.productsServiceImpls = productsServiceImpls;
    }

    @GetMapping("/products")
    @Operation(summary = "Recibe todos los productos")
    public ResponseEntity<List<ProductsDTO>> getAllProducts() {
        return ResponseEntity.status(HttpStatus.OK).body(this.productsServiceImpls.getAllProducts());
    }

    @PostMapping("/products/new")
    @Operation(summary = "Registra un nuevo producto")
    public ResponseEntity<ProductsDTO> newProduct(@RequestBody CreateProductRequest newProduct) {
        return ResponseEntity.status(HttpStatus.CREATED).body(this.productsServiceImpls.newProduct(newProduct));
    }

    @PutMapping("/products/update/{id}")
    @Operation(summary = "Actualiza un producto por su id")
    public ResponseEntity<ProductsDTO> updateProduct(@RequestBody CreateProductRequest product, @PathVariable long id){
        return ResponseEntity.status(HttpStatus.OK).body(this.productsServiceImpls.updateProduct(product, id));
    }

    @DeleteMapping("/products/delete/{id}")
    @Operation(summary = "Elimina un producto por su id")
    public ResponseEntity<ProductsDTO> deleteProduct(@PathVariable long id){
        return ResponseEntity.status(HttpStatus.OK).body(this.productsServiceImpls.deleteProduct(id));
    }

    @GetMapping("/products/{category}")
    @Operation(summary = "Recibe todos los productos por categoria")
    public ResponseEntity<List<ProductsDTO>> getProductsByCategory(@PathVariable String category){
        return ResponseEntity.status(HttpStatus.OK).body(this.productsServiceImpls.getProductsByCategory(category));
    }

    @GetMapping("/products/user/{idUser}")
    @Operation(summary = "Recibe todos los productos por id de usuario")
    public ResponseEntity<List<ProductsDTO>> getProductsByUserId(@PathVariable long id){
        return ResponseEntity.status(HttpStatus.OK).body(this.productsServiceImpls.getProductsByUserId(id));
    }
    @GetMapping("/products/search/{name}")
    @Operation(summary = "Recibe todos los productos por nombre")
    public ResponseEntity<List<ProductsDTO>> getProductsByName(@PathVariable String name){
        return ResponseEntity.status(HttpStatus.OK).body(this.productsServiceImpls.searchProducts(name));
    }



}
