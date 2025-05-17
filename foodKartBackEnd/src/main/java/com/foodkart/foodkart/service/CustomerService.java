package com.foodkart.foodkart.service;

import com.foodkart.foodkart.exception.DetailsNotFoundException;
import com.foodkart.foodkart.exception.DetailsAlreadyExistsException;
import com.foodkart.foodkart.model.Customer;
import com.foodkart.foodkart.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Simpson Alfred
 */

@Service
@RequiredArgsConstructor
public class CustomerService {
    private final CustomerRepository customerRepository;

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Object createCustomer(Customer customer) {
        if (isCustomerEmailAlreadyExists(customer.getEmail())) {
            return customer.getEmail() + " already exists!";
        }
        Customer savedCustomer = customerRepository.save(customer);
        return savedCustomer;
    }

    public void deleteCustomer(String email) {
        Customer customer = customerRepository.findByEmail(email);
        if (customer == null){
            throw new DetailsNotFoundException("Sorry, customer not found with email: " + email);
        }
        customerRepository.deleteById(customer.getId());
    }

    public Customer updatePassword(String email, String newPassword) {
        if (!isCustomerEmailAlreadyExists(email)){
            throw new DetailsNotFoundException("Sorry, customer not found with email: " + email);
        }
        Customer customer = customerRepository.findByEmail(email);
        customer.setPassword(newPassword);
        return customerRepository.save(customer);
    }

    public Customer getCustomerByEmailAndPassword(String email, String password) {

        Customer customer = customerRepository.findByEmailAndPassword(email,password);
        return customer;
    }

//    public Customer getByEmailAndPassword(String email, String password) {
//        if (!isCustomerEmailAlreadyExists(email)){
//            throw new DetailsNotFoundException("Sorry, customer not found with email: " + email);
//        }
//        Customer customer = customerRepository.findByEmailAndPassword(email);
//        customer.setPassword(password);
//        return customerRepository.save(customer);
//    }

    private boolean isCustomerEmailAlreadyExists(String email) {
        Customer customer = customerRepository.findByEmail(email);
        return customer != null;
    }

}
