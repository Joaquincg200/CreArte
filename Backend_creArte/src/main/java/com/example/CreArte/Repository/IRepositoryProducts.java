package com.example.CreArte.Repository;

import com.example.CreArte.Entity.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface IRepositoryProducts extends JpaRepository<Products, Long> {
    List<Products> findByCategory(String category);
    List<Products> findByIdUser_Id(Long id);

    @Query("SELECT p " +
            "FROM Products p " +
            "WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Products> findByNameContainingIgnoreCase(String keyword);


    @Query(value = "SELECT * FROM products p WHERE " +
            "(:category IS NULL OR LOWER(p.category) = LOWER(:category)) AND " +
            "(:minPrice IS NULL OR p.price >= :minPrice) AND " +
            "(:maxPrice IS NULL OR p.price <= :maxPrice) " +
            "ORDER BY RAND() LIMIT 4", nativeQuery = true)
    List<Products> filterRandomProducts(
            @Param("category") String category,
            @Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice
    );

}


