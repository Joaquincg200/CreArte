package com.example.CreArte.Repository;

import com.example.CreArte.Entity.Reviews;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IRepositoryReviews extends JpaRepository<Reviews, Long> {
    List<Reviews> findByProductId_Id(Long productId);
    List<Reviews> findByUserId_Id(Long userId);
}
