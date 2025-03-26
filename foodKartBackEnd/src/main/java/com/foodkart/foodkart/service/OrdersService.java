package com.foodkart.foodkart.service;

import com.foodkart.foodkart.model.Orders;
import com.foodkart.foodkart.repository.OrdersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class OrdersService {

    @Autowired
    private OrdersRepository ordersRepository;

    public Orders createOrder(Orders order) {
        return ordersRepository.save(order);
    }

    public List<Orders> getByOrderId(String orderId) {
        return ordersRepository.findByOrderId(orderId);
    }

    public List<Orders> getByEmail(String email) {
        return ordersRepository.findByEmail(email);
    }

    public List<Orders> getByOrderedDate(LocalDate orderedDate) {
        return ordersRepository.findByOrderedDate(orderedDate);
    }

    public List<Orders> getByDeliveryDate(LocalDate deliveryDate) {
        return ordersRepository.findByDeliveryDate(deliveryDate);
    }

    public List<Orders> getByStatus(String status) {
        return ordersRepository.findByStatus(status);
    }

    public List<Orders> getByDeliveredBy(String deliveredBy) {
        return ordersRepository.findByDeliveredBy(deliveredBy);
    }
}
