package com.foodkart.foodkart.repository;

import com.foodkart.foodkart.model.Cart;
import com.foodkart.foodkart.model.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


public interface CartRepository extends JpaRepository<Cart, Long> {
    List<Cart> findByEmail(String email);
    List<Cart> findByEmailAndFoodId(String email, String foodId);
    @Transactional
    void deleteByEmailAndFoodId(String email, String foodId);
}