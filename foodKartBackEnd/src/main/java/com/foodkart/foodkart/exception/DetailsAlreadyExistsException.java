package com.foodkart.foodkart.exception;

public class DetailsAlreadyExistsException extends RuntimeException {
    public DetailsAlreadyExistsException(String message) {
        super(message);
    }
}

