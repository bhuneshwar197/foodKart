package com.foodkart.foodkart.controller;

import com.foodkart.foodkart.model.Cart;
import com.foodkart.foodkart.response.requests.SavedCartResponse;
import com.foodkart.foodkart.service.CartService;
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

    @GetMapping("/get-all-cart")
    public ResponseEntity<List<Cart>> getAllCart(){
        return new ResponseEntity<>(cartService.getAllCart(), HttpStatus.FOUND);
    }

    // Create a new cart item
    @PostMapping("/create-cart")
    public ResponseEntity<SavedCartResponse> createCart(@RequestBody Cart cart) {
        return ResponseEntity.ok(cartService.createCart(cart));
    }

    // Get cart items by email
    @GetMapping("/get-cart-by-email/{email}")
    public ResponseEntity<List<SavedCartResponse>> viewCartByEmail(@PathVariable String email) {
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
