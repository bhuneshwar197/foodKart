package com.foodkart.foodkart.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

/**
 * @author Simpson Alfred
 */
@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "prepare_order")
public class PrepareOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_history_id")
    private Long prepareOrderId;  // Auto-incremented primary key

    @Column(name = "order_id", length = 100, nullable = false)
    private String orderId;

    @Column(name = "email", length = 30, nullable = false)
    private String email;

    @Column(name = "food_id", length = 50, nullable = false)
    private String foodId;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @Column(name = "sold_price", precision = 10, scale = 2, nullable = false)
    private BigDecimal soldPrice;
}

