package com.foodkart.foodkart.controller;

import com.foodkart.foodkart.model.PrepareOrder;
import com.foodkart.foodkart.requests.PreparedOrderRequest;
import com.foodkart.foodkart.service.PrepareOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/prepare-order")
@CrossOrigin("http://localhost:3000")
@RequiredArgsConstructor
public class PrepareOrderController {

    private final PrepareOrderService prepareOrderService;

    @GetMapping("/get-all-prepared-order")
    public ResponseEntity<List<PrepareOrder>> getAllPrepareOrder() {
        List<PrepareOrder> orders = prepareOrderService.getAllPrepareOrder();
        return ResponseEntity.ok(orders);
    }

    @PostMapping("/create-prepared-order")
    public ResponseEntity<String> createOrder(@RequestBody PreparedOrderRequest preparedOrderRequest) {
        String orderId = prepareOrderService.createOrder(preparedOrderRequest);
        return ResponseEntity.ok(orderId);
    }

//    @GetMapping("/prepared-order-by-order-id/{orderId}")
//    public ResponseEntity<List<PrepareOrder>> getByOrderId(@PathVariable String orderId) {
//        List<PrepareOrder> orders = PrepareOrderService.findByOrderId(orderId);
//        return ResponseEntity.ok(orders);
//    }
//
//    @GetMapping("/prepared-order-by-email/{email}")
//    public ResponseEntity<List<PrepareOrder>> getByEmail(@PathVariable String email) {
//        List<PrepareOrder> orders = PrepareOrderService.getByEmail(email);
//        return ResponseEntity.ok(orders);
//    }
//
//    @GetMapping("/prepared-order-by-order-id-and-email/{orderId}/{email}")
//    public ResponseEntity<?> getByOrderIdAndEmail(@PathVariable String orderId, @PathVariable String email) {
//        Optional<PrepareOrder> order = PrepareOrderService.getByOrderIdAndEmail(orderId, email);
//        return order.map(ResponseEntity::ok)
//                .orElseGet(() -> ResponseEntity.notFound().build());
//    }
}
