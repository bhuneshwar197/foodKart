package com.foodkart.foodkart.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * Entity class for Orders table
 * Author: Simpson Alfred
 */
@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "orders")
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;  // Auto-incremented primary key

    @Column(name = "order_id", length = 100, nullable = false)
    private String orderId;

    @Column(name = "email", length = 300, nullable = false)
    private String email;

    @Column(name = "total_price", precision = 10, scale = 2, nullable = false)
    private BigDecimal totalPrice;

    @Column(name = "ordered_date")
    private LocalDate orderedDate;

    @Column(name = "delivery_date")
    private LocalDate deliveryDate;

    @Column(name = "delivery_address", length = 300)
    private String deliveryAddress;

    @Column(name = "status", length = 200)
    private String status;

    @Column(name = "delivered_by", length = 300)
    private String deliveredBy;
}
