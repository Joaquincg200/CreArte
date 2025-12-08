package com.example.CreArte.Repository;

import com.example.CreArte.Entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IRepositoryOrders extends JpaRepository<Orders, Long> {
    @Query("SELECT o FROM Orders o JOIN o.idUser u WHERE u.id = :idUser")
    List<Orders> findByUserId(Long idUser);

    @Query("SELECT CASE WHEN COUNT(o) > 0 THEN true ELSE false END " +
            "FROM Orders o JOIN o.idProducts p " +
            "WHERE o.idUser.id = :idUser AND p.id = :idProduct")
    boolean existBoughtProduct(@Param("idUser") Long idUser, @Param("idProduct") Long idProduct);

    @Query("SELECT o FROM Orders o WHERE o.buyer.id = :buyerId")
    List<Orders> findOrdersByBuyerId(@Param("buyerId") Long buyerId);







}
