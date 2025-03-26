package com.foodkart.foodkart.service;

import com.foodkart.foodkart.exception.DetailsNotFoundException;
import com.foodkart.foodkart.model.Admin;
import com.foodkart.foodkart.model.Cart;
import com.foodkart.foodkart.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;

    public List<Cart> getAllCart() {
        return cartRepository.findAll();
    }


    public Cart createCart(Cart cart) {
        return cartRepository.save(cart);
    }

    // Get cart items by email
    public List<Cart> viewCartByEmail(String email) {
        return cartRepository.findByEmail(email);
    }

    // Update cart quantity by email and foodId
    public Cart updateCartByEmailAndFoodId(String email, String foodId, int newQty) {
        List<Cart> cartItems = cartRepository.findByEmail(email);
        Optional<Cart> existingCart = cartItems.stream()
                .filter(cart -> cart.getFoodId().equals(foodId))
                .findFirst();

        if (existingCart.isPresent()) {
            Cart cart = existingCart.get();
            cart.setQuantity(newQty);
            return cartRepository.save(cart);
        } else {
            throw new DetailsNotFoundException("Sorry, food not found in cart with foodId: " + foodId + " and emailId: " +email);
        }
    }

    public void deleteCartByEmailAndFoodId(String email, String foodId) {
        List<Cart> cartItems = cartRepository.findByEmailAndFoodId(email, foodId);
//        Optional<Cart> existingCart = cartItems.stream()
//                .filter(cart -> cart.getFoodId().equals(foodId))
//                .findFirst();
        //if (existingCart.isPresent()) {
        if (cartItems != null) {
            cartRepository.deleteByEmailAndFoodId(email, foodId);
        } else {
            throw new DetailsNotFoundException("Sorry, food not found in cart with foodId: " + foodId + " and emailId: " +email);
        }
    }
}
