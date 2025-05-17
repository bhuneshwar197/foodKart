package com.foodkart.foodkart.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * @author Simpson Alfred
 */
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor

public class CustomerFeedbackRequest {
    private String email;
    private String subject;
    private String message;
}

