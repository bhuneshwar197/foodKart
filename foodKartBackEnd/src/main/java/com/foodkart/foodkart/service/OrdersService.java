package com.foodkart.foodkart.service;

import com.foodkart.foodkart.model.Food;
import com.foodkart.foodkart.model.Orders;
import com.foodkart.foodkart.model.PrepareOrder;
import com.foodkart.foodkart.repository.FoodRepository;
import com.foodkart.foodkart.repository.OrdersRepository;
import com.foodkart.foodkart.repository.PrepareOrderRepository;
import com.foodkart.foodkart.requests.FoodDetail;
import com.foodkart.foodkart.response.requests.CustomerOrderResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class OrdersService {

    @Autowired
    private OrdersRepository ordersRepository;

    @Autowired
    private PrepareOrderRepository prepareOrderRepository;
    @Autowired
    private FoodRepository foodRepository;

    public Orders createOrder(Orders order) {
        return ordersRepository.save(order);
    }

    public List<Orders> getByOrderId(String orderId) {
        return ordersRepository.findByOrderId(orderId);
    }

    public List<CustomerOrderResponse> getCustomerOrderByEmail(String email) {
        List<CustomerOrderResponse> customerOrderResponseList = new ArrayList<>();

        List<Orders> orderListByEmail = ordersRepository.findByEmail(email);

        orderListByEmail.forEach(orderByEmail -> {
            List<FoodDetail> foodDetails = new ArrayList<>();
            List<PrepareOrder> preparedOrderListByOrderId = prepareOrderRepository.findByOrderId(orderByEmail.getOrderId());

            preparedOrderListByOrderId.forEach(preparedFood -> {
                Food food = foodRepository.findByFoodId(preparedFood.getFoodId());

                FoodDetail foodDetail = new FoodDetail();
                foodDetail.setFoodId(preparedFood.getFoodId());
                foodDetail.setFoodName(food.getFoodName());
                foodDetail.setImageUrl(food.getImageUrl());
                foodDetail.setQuantity(preparedFood.getQuantity());
                foodDetail.setSoldPrice(preparedFood.getSoldPrice());
                foodDetail.setCategory(food.getCategory());
                foodDetail.setType(food.getType());
                foodDetail.setDescription(food.getDescription());

                foodDetails.add(foodDetail);
            });

            CustomerOrderResponse customerOrderResponse = CustomerOrderResponse
                    .builder()
                    .orderId(orderByEmail.getOrderId())
                    .totalPrice(orderByEmail.getTotalPrice())
                    .orderedDate(orderByEmail.getOrderedDate())
                    .deliveryDate(orderByEmail.getDeliveryDate())
                    .customerName(orderByEmail.getCustomerName())
                    .mobile(orderByEmail.getMobile())
                    .pincode(orderByEmail.getPincode())
                    .deliveryAddress(orderByEmail.getDeliveryAddress())
                    .deliveryStatus(orderByEmail.getOrderStatus())
                    .foodDetails(foodDetails)
                    .build();
            customerOrderResponseList.add(customerOrderResponse);

        });
        return customerOrderResponseList;
    }

    public List<Orders> getByOrderedDate(LocalDate orderedDate) {
        return ordersRepository.findByOrderedDate(orderedDate);
    }

    public List<Orders> getByDeliveryDate(LocalDate deliveryDate) {
        return ordersRepository.findByDeliveryDate(deliveryDate);
    }

    public List<Orders> getByOrderStatus(String status) {
        return ordersRepository.findByOrderStatus(status);
    }

    public List<Orders> getByDeliveredBy(String deliveredBy) {
        return ordersRepository.findByDeliveredBy(deliveredBy);
    }
}
