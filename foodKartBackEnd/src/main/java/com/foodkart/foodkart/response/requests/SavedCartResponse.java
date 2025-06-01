package com.foodkart.foodkart.response.requests;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SavedCartResponse {

    private Long cartId;  // Auto-incremented primary key

//    private String email;

    private String foodId;

    private String foodName;

    private String foodDescription;

    private Integer quantity;

    private BigDecimal sellingPrice;

    private String imageUrl;

    private Integer cartLimit;

    private String category;

    private String type;

    private String description;

}

