package com.foodkart.foodkart.controller;

import com.foodkart.foodkart.model.Customer;
import com.foodkart.foodkart.service.CustomerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Simpson Alfred
 */
@CrossOrigin("http://localhost:3000") //allowing client application to consume the backed
@RestController
@RequestMapping("/customer")
@RequiredArgsConstructor

public class CustomerController {
    private final CustomerService customerService;

    @GetMapping("/get-all-customer")
    public ResponseEntity<List<Customer>> getAllCustomers(){
        return new ResponseEntity<>(customerService.getAllCustomers(), HttpStatus.FOUND);
    }

    @PostMapping("/create-customer")
    public Customer createCustomer(@RequestBody Customer customer){
        return customerService.createCustomer(customer);
    }

    @DeleteMapping("/delete-customer/{email}")
    public void deleteCustomer(@PathVariable String email){
        customerService.deleteCustomer(email);
    }

    @PutMapping("/update-password")
    public Customer updatePassword(@RequestParam (required = false) String email, @RequestParam(required = false) String password) {
        return customerService.updatePassword(email, password);
    }

}
