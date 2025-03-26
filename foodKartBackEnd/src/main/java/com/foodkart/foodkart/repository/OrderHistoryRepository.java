package com.foodkart.foodkart.repository;

import com.foodkart.foodkart.model.OrderHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderHistoryRepository extends JpaRepository<OrderHistory, Long> {

    List<OrderHistory> findByOrderId(String orderId);

    List<OrderHistory> findByEmail(String email);

    Optional<OrderHistory> findByOrderIdAndEmail(String orderId, String email);
}
