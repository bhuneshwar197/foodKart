package com.foodkart.foodkart.controller;

import com.foodkart.foodkart.model.Food;
import com.foodkart.foodkart.model.OrderHistory;
import com.foodkart.foodkart.service.OrderHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/order-history")
@RequiredArgsConstructor
public class OrderHistoryController {

    private final OrderHistoryService orderHistoryService;

    @GetMapping("/get-all-order-history")
    public ResponseEntity<List<OrderHistory>> getAllOrderHistory() {
        List<OrderHistory> orders = orderHistoryService.getAllOrderHistory();
        return ResponseEntity.ok(orders);
    }

    @PostMapping("/create-order-history")
    public ResponseEntity<OrderHistory> createOrder(@RequestBody OrderHistory orderHistory) {
        OrderHistory savedOrder = orderHistoryService.createOrder(orderHistory);
        return ResponseEntity.ok(savedOrder);
    }

    @GetMapping("/order-history-by-order-id/{orderId}")
    public ResponseEntity<List<OrderHistory>> getByOrderId(@PathVariable String orderId) {
        List<OrderHistory> orders = orderHistoryService.findByOrderId(orderId);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/order-history-by-email/{email}")
    public ResponseEntity<List<OrderHistory>> getByEmail(@PathVariable String email) {
        List<OrderHistory> orders = orderHistoryService.getByEmail(email);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/order-history-by-order-id-and-email/{orderId}/{email}")
    public ResponseEntity<?> getByOrderIdAndEmail(@PathVariable String orderId, @PathVariable String email) {
        Optional<OrderHistory> order = orderHistoryService.getByOrderIdAndEmail(orderId, email);
        return order.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
