package com.foodkart.foodkart.requests;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class FoodRequest {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;  // Auto-incremented field

    private String foodId;

    private String foodName;

    private BigDecimal sellingPrice;

    private String description;

    private String imageUrl;

//    @Lob
//    private String image;
//    MultipartFile

//    private MultipartFile image;

    private Integer qty;

    private String category;

    private String type;

    private Integer cartLimit;

}

