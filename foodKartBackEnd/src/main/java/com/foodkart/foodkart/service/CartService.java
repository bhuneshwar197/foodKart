package com.foodkart.foodkart.service;

import com.foodkart.foodkart.exception.DetailsNotFoundException;
import com.foodkart.foodkart.model.Admin;
import com.foodkart.foodkart.model.Cart;
import com.foodkart.foodkart.model.Food;
import com.foodkart.foodkart.model.Cart;
import com.foodkart.foodkart.repository.CartRepository;
import com.foodkart.foodkart.repository.FoodRepository;
import com.foodkart.foodkart.response.requests.SavedCartResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.smartcardio.Card;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@Service
@RequiredArgsConstructor
public class CartService {
    Logger logger = Logger.getLogger(CartService.class.getName());

    private final CartRepository cartRepository;
    private final FoodRepository foodRepository;

    public List<Cart> getAllCart() {
        return cartRepository.findAll();
    }


    public SavedCartResponse createCart(Cart cart) {
        String customerEmail = cart.getEmail();
        if(customerEmail != null && !customerEmail.isEmpty()) {
            Cart existingCartItemByEmailAndFoodId = cartRepository.findByEmailAndFoodId(customerEmail, cart.getFoodId());
            Cart savedCard;
            if (existingCartItemByEmailAndFoodId != null) {
                existingCartItemByEmailAndFoodId.setQuantity(existingCartItemByEmailAndFoodId.getQuantity() + cart.getQuantity());
                existingCartItemByEmailAndFoodId.setInsertedDate(LocalDate.now());
                savedCard = cartRepository.save(existingCartItemByEmailAndFoodId);
            } else {
                cart.setInsertedDate(LocalDate.now());
                savedCard = cartRepository.save(cart);
            }
            Food food = foodRepository.findByFoodId(cart.getFoodId());
            byte[] image = null;
            if (food.getImage() != null) {
                image = food.getImage();
            }
            SavedCartResponse savedCartResponse = SavedCartResponse
                    .builder()
                    .cartId(savedCard.getCartId())
                    .foodId(savedCard.getFoodId())
                    .quantity(savedCard.getQuantity())
                    .sellingPrice(food.getSellingPrice())
                    .foodImage(image)
                    .foodName(food.getFoodName())
                    .foodDescription(food.getDescription())
                    .build();
            return savedCartResponse;
        } else {
            logger.info("No cart created as email id is null or empty");
            return null;
        }
    }

    // Get cart items by email
    public List<SavedCartResponse> viewCartByEmail(String email) {

        List<Cart> cartListByEmail =  cartRepository.findByEmail(email);
        List<SavedCartResponse> savedCartResponses =  new ArrayList<>();
        cartListByEmail.forEach(cartByEmail -> {

            Food food = foodRepository.findByFoodId(cartByEmail.getFoodId());
            byte[] image = null;
            if(food.getImage() != null) {
                image = food.getImage();
            }

            SavedCartResponse savedCartResponse = SavedCartResponse
                    .builder()
                    .cartId(cartByEmail.getCartId())
                    .foodId(cartByEmail.getFoodId())
                    .quantity(cartByEmail.getQuantity())
                    .sellingPrice(food.getSellingPrice())
                    .foodImage(image)
                    .foodName(food.getFoodName())
                    .foodDescription(food.getDescription())
                    .build();
            savedCartResponses.add(savedCartResponse);
        });
        return savedCartResponses;

    }

    // Update cart quantity by email and foodId
    public Cart updateCartByEmailAndFoodId(String email, String foodId, int newQty) {
        Cart cart = cartRepository.findByEmailAndFoodId(email, foodId);
//        Optional<Cart> existingCart = cartItems.stream()
//                .filter(cart -> cart.getFoodId().equals(foodId))
//                .findFirst();

        if (cart != null) {
            cart.setQuantity(newQty);
            return cartRepository.save(cart);
        } else {
            throw new DetailsNotFoundException("Sorry, food not found in cart with foodId: " + foodId + " and emailId: " +email);
        }
    }

    public void deleteCartByEmailAndFoodId(String email, String foodId) {
        Cart cartItems = cartRepository.findByEmailAndFoodId(email, foodId);
        if (cartItems != null) {
            cartRepository.deleteByEmailAndFoodId(email, foodId);
        } else {
            throw new DetailsNotFoundException("Sorry, food not found in cart with foodId: " + foodId + " and emailId: " +email);
        }
    }

    public void deleteAllByEmail(String email) {
        List<Cart> cartItems = cartRepository.findByEmail(email);
        if (cartItems != null) {
            cartRepository.deleteAllByEmail(email);
        } else {
            throw new DetailsNotFoundException("Sorry, food not found in cart with emailId: " +email);
        }
    }
}
