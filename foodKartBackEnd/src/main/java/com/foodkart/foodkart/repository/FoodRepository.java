package com.foodkart.foodkart.repository;

import com.foodkart.foodkart.model.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;


public interface FoodRepository extends JpaRepository<Food, Long> {
    Food findByFoodId (String foodId);
    @Transactional
    void deleteByFoodId(String foodId);
}

