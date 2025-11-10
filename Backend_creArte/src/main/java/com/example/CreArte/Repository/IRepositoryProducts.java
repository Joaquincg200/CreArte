package com.example.CreArte.Repository;

import com.example.CreArte.Entity.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
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
}
