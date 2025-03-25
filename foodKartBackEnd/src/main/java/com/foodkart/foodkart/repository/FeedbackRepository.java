package com.foodkart.foodkart.repository;

import com.foodkart.foodkart.model.Customer;
import com.foodkart.foodkart.model.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    List<Feedback> findAllByEmail(String email);
}

