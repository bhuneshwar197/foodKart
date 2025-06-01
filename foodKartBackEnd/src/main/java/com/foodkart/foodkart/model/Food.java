package com.foodkart.foodkart.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

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
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;  // Auto-incremented field

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "food_id", updatable = false, nullable = false, length = 50)
    private String foodId;

    @Column(name = "food_name", length = 100)
    private String foodName;

    @Column(name = "selling_price", precision = 10, scale = 2)
    private BigDecimal sellingPrice;

    @Column(name = "description", length = 300)
    private String description;

    @Column(name = "imageUrl", length = 300)
    private String imageUrl;

    @Column(name = "qty")
    private Integer qty;

    @Column(name = "category", length = 30)
    private String category;

    @Column(name = "type", length = 30)
    private String type;

    @Column(name = "cart_limit")
    private Integer cartLimit;

}

