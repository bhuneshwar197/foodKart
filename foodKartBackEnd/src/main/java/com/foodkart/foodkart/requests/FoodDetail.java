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
    private String foodName;
    private int quantity;
    private BigDecimal soldPrice;
    private String imageUrl;
    private String category;
    private String type;
    private String description;

}


