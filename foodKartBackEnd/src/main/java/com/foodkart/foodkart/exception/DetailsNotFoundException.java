package com.foodkart.foodkart.exception;

public class DetailsNotFoundException extends RuntimeException {
    public DetailsNotFoundException(String message) {
        super(message);
    }
}
