package com.example.CreArte.Controller;

import com.example.CreArte.Dto.ProductsDTO;
import com.example.CreArte.Request.CreateProductRequest;
import com.example.CreArte.Service.ProductsServiceImpls;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
public class ProductsController {
    private ProductsServiceImpls productsServiceImpls;

    public ProductsController(ProductsServiceImpls productsServiceImpls) {
        this.productsServiceImpls = productsServiceImpls;
    }

    @GetMapping("/api/products")
    @Operation(summary = "Recibe todos los productos")
    public ResponseEntity<List<ProductsDTO>> getAllProducts() {
        return ResponseEntity.status(HttpStatus.OK).body(this.productsServiceImpls.getAllProducts());
    }

    @PostMapping("/api/products/new")
    @Operation(summary = "Registra un nuevo producto")
    public ResponseEntity<ProductsDTO> newProduct(@RequestBody CreateProductRequest newProduct) {
        return ResponseEntity.status(HttpStatus.CREATED).body(this.productsServiceImpls.newProduct(newProduct));
    }

    @PutMapping("/api/products/update/{id}")
    @Operation(summary = "Actualiza un producto por su id")
    public ResponseEntity<ProductsDTO> updateProduct(@RequestBody CreateProductRequest product, @PathVariable long id){
        return ResponseEntity.status(HttpStatus.OK).body(this.productsServiceImpls.updateProduct(product, id));
    }

    @DeleteMapping("/api/products/delete/{id}")
    @Operation(summary = "Elimina un producto por su id")
    public ResponseEntity<ProductsDTO> deleteProduct(@PathVariable long id){
        return ResponseEntity.status(HttpStatus.OK).body(this.productsServiceImpls.deleteProduct(id));
    }

    @GetMapping("/api/products/{category}")
    @Operation(summary = "Recibe todos los productos por categoria")
    public ResponseEntity<List<ProductsDTO>> getProductsByCategory(@PathVariable String category){
        return ResponseEntity.status(HttpStatus.OK).body(this.productsServiceImpls.getProductsByCategory(category));
    }

    @GetMapping("/api/products/user/{idUser}")
    @Operation(summary = "Recibe todos los productos por id de usuario")
    public ResponseEntity<List<ProductsDTO>> getProductsByUserId(@PathVariable long idUser){
        return ResponseEntity.status(HttpStatus.OK).body(this.productsServiceImpls.getProductsByUserId(idUser));
    }
    @GetMapping("/api/products/search/{name}")
    @Operation(summary = "Recibe todos los productos por nombre")
    public ResponseEntity<List<ProductsDTO>> getProductsByName(@PathVariable String name){
        return ResponseEntity.status(HttpStatus.OK).body(this.productsServiceImpls.searchProducts(name));
    }

    @GetMapping("/api/product/{id}")
    @Operation(summary = "Recibe un producto por su id")
    public ResponseEntity<ProductsDTO> getProductById(@PathVariable long id){
        return ResponseEntity.status(HttpStatus.OK).body(this.productsServiceImpls.getProductById(id));
    }

    @GetMapping("/api/products/random")
    @Operation(summary = "Recibe hasta 4 productos por categoría")
    public ResponseEntity<Map<String, List<ProductsDTO>>> getProducts(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false, defaultValue = "4") Integer limit
    ) {
        // Llamamos al servicio que devuelve lista de ProductsDTO
        List<ProductsDTO> productsList = this.productsServiceImpls
                .getFilteredRandomProducts(category, minPrice, maxPrice)
                .stream()
                .limit(limit)
                .collect(Collectors.toList());

        // Creamos el JSON con clave "products" para Voiceflow
        Map<String, List<ProductsDTO>> response = new HashMap<>();
        response.put("products", productsList);

        // Devolvemos OK con el JSON
        return ResponseEntity.ok(response);
    }




}
