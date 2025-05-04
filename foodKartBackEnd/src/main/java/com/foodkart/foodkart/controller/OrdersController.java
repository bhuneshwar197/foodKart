package com.foodkart.foodkart.controller;

import com.foodkart.foodkart.model.Orders;
import com.foodkart.foodkart.service.OrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/orders")
@CrossOrigin("http://localhost:3000")
public class OrdersController {

    @Autowired
    private OrdersService ordersService;

    @PostMapping("/create-order")
    public ResponseEntity<Orders> createOrder(@RequestBody Orders order) {
        return ResponseEntity.ok(ordersService.createOrder(order));
    }

    @GetMapping("/get-by-orderId/{orderId}")
    public ResponseEntity<List<Orders>> getByOrderId(@PathVariable String orderId) {
        return ResponseEntity.ok(ordersService.getByOrderId(orderId));
    }

    @GetMapping("/get-by-email/{email}")
    public ResponseEntity<List<Orders>> getByEmail(@PathVariable String email) {
        return ResponseEntity.ok(ordersService.getByEmail(email));
    }

    @GetMapping("/get-by-orderedDate/{orderedDate}")
    public ResponseEntity<List<Orders>> getByOrderedDate(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate orderedDate) {
        return ResponseEntity.ok(ordersService.getByOrderedDate(orderedDate));
    }

    @GetMapping("/get-by-deliveryDate/{deliveryDate}")
    public ResponseEntity<List<Orders>> getByDeliveryDate(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate deliveryDate) {
        return ResponseEntity.ok(ordersService.getByDeliveryDate(deliveryDate));
    }

    @GetMapping("/get-by-status/{status}")
    public ResponseEntity<List<Orders>> getByOrderStatus(@PathVariable String status) {
        return ResponseEntity.ok(ordersService.getByOrderStatus(status));
    }

    @GetMapping("/get-by-deliveredBy/{deliveredBy}")
    public ResponseEntity<List<Orders>> getByDeliveredBy(@PathVariable String deliveredBy) {
        return ResponseEntity.ok(ordersService.getByDeliveredBy(deliveredBy));
    }
}
