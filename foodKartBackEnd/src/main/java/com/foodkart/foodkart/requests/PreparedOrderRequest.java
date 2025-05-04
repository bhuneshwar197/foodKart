package com.foodkart.foodkart.requests;

//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
//
//import java.math.BigDecimal;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor

public class PreparedOrderRequest {
    private String email;
    private String customerName;
    private Long mobile;
    private String pincode;
    private String deliveryAddress;
    private List<FoodDetail> foodDetails;
}


