package com.foodkart.foodkart.controller;

import com.foodkart.foodkart.model.Feedback;
import com.foodkart.foodkart.model.Food;
import com.foodkart.foodkart.requests.FoodRequest;
import com.foodkart.foodkart.service.FeedbackService;
import com.foodkart.foodkart.service.FoodService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * @author Simpson Alfred
 */
@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/food")
@RequiredArgsConstructor
public class FoodController {

    private final FoodService foodService;

    @PostMapping("/create-food")
    public ResponseEntity<Food> createFood(@RequestBody FoodRequest foodRequest) {
        Food savedFood = foodService.createFood(foodRequest);
        return new ResponseEntity<>(savedFood, HttpStatus.CREATED);
    }

    @GetMapping("/get-all-food")
    public ResponseEntity<List<Food>> getAllFoods() {
        List<Food> foods = foodService.getAllFoods();
        return new ResponseEntity<>(foods, HttpStatus.OK);
    }

    @GetMapping("/get-food-by-food-id/{foodId}")
    public ResponseEntity<Food> getFoodByFoodId(@PathVariable String foodId) {
        Food food = foodService.getFoodByFoodId(foodId);
        return new ResponseEntity<>(food, HttpStatus.OK);
    }

    @PutMapping("/update-food")
    public ResponseEntity<Food> updateFoodByFoodId(@RequestBody Food foodDetails) {
        Food updatedFood = foodService.updateFoodByFoodId(foodDetails);
        return new ResponseEntity<>(updatedFood, HttpStatus.OK);
    }

    @DeleteMapping("/delete-food-by-food-id/{foodId}")
    public ResponseEntity<String> deleteFoodByFoodId(@PathVariable String foodId) {
        foodService.deleteFoodByFoodId(foodId);
        return ResponseEntity.ok("Food item deleted successfully with foodId: " +foodId);
    }
}
