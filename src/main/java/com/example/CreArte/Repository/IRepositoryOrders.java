package com.example.CreArte.Repository;

import com.example.CreArte.Entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IRepositoryOrders extends JpaRepository<Orders, Long> {
    @Query("SELECT o FROM Orders o JOIN FETCH o.idProducts WHERE o.id = :id")
    List<Orders> findByIdUser_Id(Long idUser);
}
