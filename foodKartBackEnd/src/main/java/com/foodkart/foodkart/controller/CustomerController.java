package com.foodkart.foodkart.controller;

import com.foodkart.foodkart.model.Customer;
import com.foodkart.foodkart.service.CustomerService;
import com.foodkart.foodkart.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

/**
 * @author Simpson Alfred
 */
@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/customer")
@RequiredArgsConstructor
public class CustomerController {
    private final CustomerService customerService;

    @Autowired
    private EmailService emailService;

    // In-memory store for OTPs (for demo only, use Redis or DB in real apps)
    private final Map<String, String> otpStore = new ConcurrentHashMap<>();

    @GetMapping("/get-all-customer")
    public ResponseEntity<List<Customer>> getAllCustomers() {
        return new ResponseEntity<>(customerService.getAllCustomers(), HttpStatus.FOUND);
    }

    @PostMapping("/create-customer")
    public Object createCustomer(@RequestBody Customer customer) {
        return customerService.createCustomer(customer);
    }

    @DeleteMapping("/delete-customer/{email}")
    public void deleteCustomer(@PathVariable String email) {
        customerService.deleteCustomer(email);
    }

    @PutMapping("/update-password")
    public Customer updatePassword(@RequestParam(required = false) String email, @RequestParam(required = false) String password) {
        return customerService.updatePassword(email, password);
    }

    @GetMapping("/get-customer-emailAndpassword")
    public Customer getCustomerByEmailAndPassword(@RequestParam(required = false) String email, @RequestParam(required = false) String password) {
        return customerService.getCustomerByEmailAndPassword(email, password);
    }

    // Send OTP to email
    @GetMapping("/send-customer-email-otp/{email}")
    public ResponseEntity<String> sendOtp(@PathVariable String email) {
        // In real applications, verify email exists and send OTP by email
        String otp = String.valueOf(new Random().nextInt(900000) + 100000); // 6-digit OTP
        otpStore.put(email, otp);
//        emailService.sendOtpEmail("bhuneshwar197@gmail.com", otp);
        emailService.sendOtpEmail(email, otp);

        // Simulate sending OTP (log or print for demo)
        System.out.println("OTP for " + email + " is: " + otp);

        return new ResponseEntity<>("OTP sent to email.", HttpStatus.OK);
    }

    // Verify OTP
    @PostMapping("/verify-customer-email-otp")
    public ResponseEntity<String> verifyOtp(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String otp = payload.get("otp");

        if (email == null || otp == null) {
            return new ResponseEntity<>("Invalid request.", HttpStatus.BAD_REQUEST);
        }

        String storedOtp = otpStore.get(email);
        if (storedOtp != null && storedOtp.equals(otp)) {
            otpStore.remove(email); // Invalidate OTP after use
            return new ResponseEntity<>("OTP is valid", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Invalid OTP", HttpStatus.UNAUTHORIZED);
        }
    }
}
