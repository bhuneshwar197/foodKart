package com.foodkart.foodkart.service;

import com.foodkart.foodkart.exception.DetailsAlreadyExistsException;
import com.foodkart.foodkart.exception.DetailsNotFoundException;
import com.foodkart.foodkart.model.Food;
import com.foodkart.foodkart.repository.FoodRepository;
import com.foodkart.foodkart.requests.FoodRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.List;

/**
 * @author Simpson Alfred
 */

@Service
@RequiredArgsConstructor
public class FoodService {

    public byte[] convertBase64ToBytes(String base64Image) {
        return Base64.getDecoder().decode(base64Image);
    }

    private final FoodRepository foodRepository;

//    public Food createFood(FoodRequest foodRequest, MultipartFile file) {
    public Food createFood(FoodRequest foodRequest) {

        Food existingFood = foodRepository.findByFoodId(foodRequest.getFoodId());

        if (existingFood != null) {
            throw new DetailsAlreadyExistsException("Sorry, food already found with foodId: " + foodRequest.getFoodId());
        }

        Food food = new Food();
        //try {
            food.setFoodId(foodRequest.getFoodId());
            food.setFoodName(foodRequest.getFoodName());
            food.setSellingPrice(foodRequest.getSellingPrice());
            food.setDescription(foodRequest.getDescription());
//        food.setImage(convertBase64ToBytes(foodRequest.getImage()));
            food.setQty(foodRequest.getQty());
            food.setCategory(foodRequest.getCategory());
            food.setType(foodRequest.getType());
            food.setCartLimit(foodRequest.getCartLimit());
            food.setRating1(foodRequest.getRating1());
            food.setRating2(foodRequest.getRating2());
            food.setRating3(foodRequest.getRating3());
            food.setRating4(foodRequest.getRating4());
            food.setRating5(foodRequest.getRating5());
//            if (foodRequest.getImage() != null) {
//                food.setImage(foodRequest.getImage().getBytes());
//            }
//            food.setImage(file.getBytes());

            Food savedFood = foodRepository.save(food);  // Save the food to the database
            return savedFood;
        //}
//        catch (IOException e) {
//            return null;
//            //return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing image");
//        }
         // Return a response with the saved food
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
