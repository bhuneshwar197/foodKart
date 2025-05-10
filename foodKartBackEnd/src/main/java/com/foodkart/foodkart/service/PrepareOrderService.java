package com.foodkart.foodkart.service;

import com.foodkart.foodkart.model.Orders;
import com.foodkart.foodkart.model.PrepareOrder;
import com.foodkart.foodkart.repository.OrdersRepository;
import com.foodkart.foodkart.repository.PrepareOrderRepository;
import com.foodkart.foodkart.requests.PreparedOrderRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PrepareOrderService {

    private final PrepareOrderRepository prepareOrderRepository;
    private final OrdersRepository ordersRepository;
    private final CartService cartService;

    public String createOrder( PreparedOrderRequest preparedOrderRequest) {
        String orderId = UUID.randomUUID().toString();
        final BigDecimal[] totalPrice = {BigDecimal.valueOf(0.0)};
        preparedOrderRequest.getFoodDetails ().forEach(preparedOrderItem -> {
            PrepareOrder preparedOrder = new PrepareOrder();
            preparedOrder.setOrderId(orderId);
            preparedOrder.setEmail(preparedOrderRequest.getEmail());
            preparedOrder.setFoodId(preparedOrderItem.getFoodId());
            preparedOrder.setQuantity(preparedOrderItem.getQuantity());
            preparedOrder.setSoldPrice(preparedOrderItem.getSoldPrice());

            totalPrice[0] = totalPrice[0].add(preparedOrderItem.getSoldPrice());

            prepareOrderRepository.save(preparedOrder);
        });


        Orders orders = Orders
                .builder()
                .orderId(orderId)
                .email(preparedOrderRequest.getEmail())
                .totalPrice(totalPrice[0])
                .orderedDate(LocalDate.now())
                .deliveredBy(null)
                .orderStatus("Not Delivered")
                .customerName(preparedOrderRequest.getCustomerName())
                .mobile(preparedOrderRequest.getMobile())
                .pincode(preparedOrderRequest.getPincode())
                .deliveryAddress(preparedOrderRequest.getDeliveryAddress())
                .deliveredBy(null)
                .build();
        ordersRepository.save(orders);
        cartService.deleteAllByEmail(preparedOrderRequest.getEmail());
        return orderId;

    }

    public List<PrepareOrder> getAllPrepareOrder() {
        return prepareOrderRepository.findAll();
    }
//
//    public List<PrepareOrder> findByOrderId(String orderId) {
//        return PrepareOrderRepository.findByOrderId(orderId);
//    }
//
//    public List<PrepareOrder> getByEmail(String email) {
//        return PrepareOrderRepository.findByEmail(email);
//    }
//
//    public Optional<PrepareOrder> getByOrderIdAndEmail(String orderId, String email) {
//        return PrepareOrderRepository.findByOrderIdAndEmail(orderId, email);
//    }
}
