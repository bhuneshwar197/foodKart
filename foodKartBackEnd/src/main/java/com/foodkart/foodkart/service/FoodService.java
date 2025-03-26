package com.foodkart.foodkart.service;

import com.foodkart.foodkart.exception.DetailsAlreadyExistsException;
import com.foodkart.foodkart.exception.DetailsNotFoundException;
import com.foodkart.foodkart.model.Admin;
import com.foodkart.foodkart.model.Food;
import com.foodkart.foodkart.repository.AdminRepository;
import com.foodkart.foodkart.repository.FoodRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * @author Simpson Alfred
 */

@Service
@RequiredArgsConstructor
public class FoodService {

    private final FoodRepository foodRepository;

    public Food createFood(Food food) {
        Food savedFood = foodRepository.save(food);  // Save the food to the database
        return savedFood;  // Return a response with the saved food
    }

    public List<Food> getAllFoods() {
        return foodRepository.findAll();  // Return all food items
    }

    public Food getFoodByFoodId(String foodId) {
        Food food = foodRepository.findByFoodId(foodId);
        return food;
    }

    public Food updateFoodByFoodId(Food foodDetails) {
        Food existingFood = foodRepository.findByFoodId(foodDetails.getFoodId());

        if (existingFood == null) {
            throw new DetailsNotFoundException("Sorry, food not found with foodId: " + foodDetails.getFoodId());
        }

        existingFood.setFoodId(foodDetails.getFoodId());
        existingFood.setFoodName(foodDetails.getFoodName());
        existingFood.setSellingPrice(foodDetails.getSellingPrice());
        existingFood.setDescription(foodDetails.getDescription());
        existingFood.setImage(foodDetails.getImage());
        existingFood.setQty(foodDetails.getQty());
        existingFood.setCategory(foodDetails.getCategory());
        existingFood.setType(foodDetails.getType());
        existingFood.setCartLimit(foodDetails.getCartLimit());
        existingFood.setRating1(foodDetails.getRating1());
        existingFood.setRating2(foodDetails.getRating2());
        existingFood.setRating3(foodDetails.getRating3());
        existingFood.setRating4(foodDetails.getRating4());
        existingFood.setRating5(foodDetails.getRating5());
        return foodRepository.save(existingFood);
    }


    public void deleteFoodByFoodId(String foodId) {
        Food food = foodRepository.findByFoodId(foodId);
        if (food == null) {
            throw new DetailsNotFoundException("Sorry, food not found with foodId:11 " + foodId);
        }
        foodRepository.deleteByFoodId(foodId);
    }

}
