package com.foodkart.foodkart.repository;

import com.foodkart.foodkart.model.PrepareOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PrepareOrderRepository extends JpaRepository<PrepareOrder, Long> {

    List<PrepareOrder> findByOrderId(String orderId);

    List<PrepareOrder> findByEmail(String email);

    Optional<PrepareOrder> findByOrderIdAndEmail(String orderId, String email);
}
