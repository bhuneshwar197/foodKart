package com.foodkart.foodkart.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * Entity class for Cart table
 * Author: Simpson Alfred
 */
@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "cart")
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_id")
    private Long cartId;  // Auto-incremented primary key

    @Column(name = "email", length = 30, nullable = false)
    private String email;

    @Column(name = "food_id", length = 50, nullable = false)
    private String foodId;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @Column(name = "inserted_date")
    private LocalDate insertedDate;

//    @Column(name = "selling_price", precision = 10, scale = 2)
//    private BigDecimal sellingPrice;
}
