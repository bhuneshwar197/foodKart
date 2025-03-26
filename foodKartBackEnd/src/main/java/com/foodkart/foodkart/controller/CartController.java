package com.foodkart.foodkart.controller;

import com.foodkart.foodkart.model.Cart;
import com.foodkart.foodkart.model.Customer;
import com.foodkart.foodkart.model.Food;
import com.foodkart.foodkart.service.CartService;
import com.foodkart.foodkart.service.FoodService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Simpson Alfred
 */
@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

//    @PostMapping("/create-food")
//    public ResponseEntity<Food> createFood(@RequestBody Food food) {
//        Food savedFood = foodService.createFood(food);
//        return new ResponseEntity<>(savedFood, HttpStatus.CREATED);
//    }
//
//    @GetMapping("/get-all-food")
//    public ResponseEntity<List<Food>> getAllFoods() {
//        List<Food> foods = foodService.getAllFoods();
//        return new ResponseEntity<>(foods, HttpStatus.OK);
//    }
//
//    @GetMapping("/get-food-by-food-id/{foodId}")
//    public ResponseEntity<Food> getFoodByFoodId(@PathVariable String foodId) {
//        Food food = foodService.getFoodByFoodId(foodId);
//        return new ResponseEntity<>(food, HttpStatus.OK);
//    }
//
//    @PutMapping("/update-food")
//    public ResponseEntity<Food> updateFoodByFoodId(@RequestBody Food foodDetails) {
//        Food updatedFood = foodService.updateFoodByFoodId(foodDetails);
//        return new ResponseEntity<>(updatedFood, HttpStatus.OK);
//    }
//
//    @DeleteMapping("/delete-food-by-food-id/{foodId}")
//    public ResponseEntity<String> deleteFoodByFoodId(@PathVariable String foodId) {
//        foodService.deleteFoodByFoodId(foodId);
//        return ResponseEntity.ok("Food item deleted successfully with foodId: " +foodId);
//    }

    @GetMapping("/get-all-cart")
    public ResponseEntity<List<Cart>> getAllCart(){
        return new ResponseEntity<>(cartService.getAllCart(), HttpStatus.FOUND);
    }

    // Create a new cart item
    @PostMapping("/create-cart")
    public ResponseEntity<Cart> createCart(@RequestBody Cart cart) {
        return ResponseEntity.ok(cartService.createCart(cart));
    }

    // Get cart items by email
    @GetMapping("/get-cart-by-email/{email}")
    public ResponseEntity<List<Cart>> viewCartByEmail(@PathVariable String email) {
        return ResponseEntity.ok(cartService.viewCartByEmail(email));
    }

    // Update cart item quantity
    @PutMapping("/update-cart-by-email-and-food-id")
    public ResponseEntity<Cart> updateCartByEmailAndFoodId(
            @RequestParam String email,
            @RequestParam String foodId,
            @RequestParam int quantity
    ) {
        Cart updatedCart = cartService.updateCartByEmailAndFoodId(email, foodId, quantity);
        return updatedCart != null ? ResponseEntity.ok(updatedCart) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/delete-cart-by-email-and-food-id")
    public ResponseEntity<String> deleteCartByEmailAndFoodId(
            @RequestParam String email,
            @RequestParam String foodId
    ) {
        cartService.deleteCartByEmailAndFoodId(email, foodId);
        return  ResponseEntity.ok("cart deleted with foodId: " + foodId + " and emailId: " +email);
    }
}
