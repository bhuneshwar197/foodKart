package com.foodkart.foodkart.response.requests;

import com.foodkart.foodkart.requests.FoodDetail;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CustomerOrderResponse {
    private String orderId;
    private BigDecimal totalPrice;
    private LocalDate orderedDate;
    private LocalDate deliveryDate;
    private String customerName;
    private Long mobile;
    private String pincode;
    private String deliveryAddress;
    private List<FoodDetail> foodDetails;
}

