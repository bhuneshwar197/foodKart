package com.foodkart.foodkart.repository;

import com.foodkart.foodkart.model.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface OrdersRepository extends JpaRepository<Orders, Long> {
    List<Orders> findByOrderId(String orderId);
    List<Orders> findByEmail(String email);
    List<Orders> findByOrderedDate(LocalDate orderedDate);
    List<Orders> findByDeliveryDate(LocalDate deliveryDate);
    List<Orders> findByStatus(String status);
    List<Orders> findByDeliveredBy(String deliveredBy);
}
