package com.foodkart.foodkart.requests;

import lombok.*;

import java.math.BigDecimal;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FoodDetail {
    private String foodId;
    private int quantity;
    private BigDecimal soldPrice;
    private byte[] foodImage = null;
}


