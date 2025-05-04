package com.foodkart.foodkart.repository;

import com.foodkart.foodkart.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Customer findByEmail(String email);

    Customer findByEmailAndPassword(String email, String password);
}

