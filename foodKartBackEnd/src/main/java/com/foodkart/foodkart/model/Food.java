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
@Table(name = "food")
public class Food {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;  // Auto-incremented field

    @Column(name = "food_id", length = 50)
    private String foodId;

    @Column(name = "food_name", length = 100)
    private String foodName;

    @Column(name = "selling_price", precision = 10, scale = 2)
    private BigDecimal sellingPrice;

    @Column(name = "description", length = 300)
    private String description;

    @Lob
    @Column(name = "image")
    private byte[] image;

    @Column(name = "qty")
    private Integer qty;

    @Column(name = "category", length = 30)
    private String category;

    @Column(name = "type", length = 30)
    private String type;

    @Column(name = "cart_limit")
    private Integer cartLimit;

    @Column(name = "rating1")
    private Integer rating1;

    @Column(name = "rating2")
    private Integer rating2;

    @Column(name = "rating3")
    private Integer rating3;

    @Column(name = "rating4")
    private Integer rating4;

    @Column(name = "rating5")
    private Integer rating5;
}

