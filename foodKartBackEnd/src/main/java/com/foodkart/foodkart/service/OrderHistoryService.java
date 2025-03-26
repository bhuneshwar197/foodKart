package com.foodkart.foodkart.service;

import com.foodkart.foodkart.model.OrderHistory;
import com.foodkart.foodkart.repository.OrderHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderHistoryService {

    private final OrderHistoryRepository orderHistoryRepository;

    public OrderHistory createOrder(OrderHistory orderHistory) {
        return orderHistoryRepository.save(orderHistory);
    }

    public List<OrderHistory> getAllOrderHistory() {
        return orderHistoryRepository.findAll();
    }

    public List<OrderHistory> findByOrderId(String orderId) {
        return orderHistoryRepository.findByOrderId(orderId);
    }

    public List<OrderHistory> getByEmail(String email) {
        return orderHistoryRepository.findByEmail(email);
    }

    public Optional<OrderHistory> getByOrderIdAndEmail(String orderId, String email) {
        return orderHistoryRepository.findByOrderIdAndEmail(orderId, email);
    }
}
