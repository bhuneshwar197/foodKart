package com.foodkart.foodkart.model;

import jakarta.persistence.*;
import lombok.*;

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
@Builder
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

    @Column(name = "order_status", length = 200)
    private String orderStatus;

    @Column(name = "customer_name", length = 100, nullable = false)
    private String customerName;

    @Column(name = "mobile", nullable = false)
    private Long mobile;

    @Column(name = "pincode", length = 300)
    private String pincode;

    @Column(name = "delivery_address", length = 300)
    private String deliveryAddress;

    @Column(name = "delivered_by", length = 300)
    private String deliveredBy;
}
