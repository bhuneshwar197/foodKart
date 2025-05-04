package com.foodkart.foodkart.requests;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor

public class FoodDetail {
    private String foodId;
    private int quantity;
    private BigDecimal soldPrice;
}


