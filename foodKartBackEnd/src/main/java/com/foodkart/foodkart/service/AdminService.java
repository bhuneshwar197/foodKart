package com.foodkart.foodkart.service;

import com.foodkart.foodkart.exception.DetailsAlreadyExistsException;
import com.foodkart.foodkart.exception.DetailsNotFoundException;
import com.foodkart.foodkart.model.Admin;
import com.foodkart.foodkart.repository.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Simpson Alfred
 */

@Service
@RequiredArgsConstructor
public class AdminService {

    private final AdminRepository adminRepository;

    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    public Admin createAdmin(Admin admin) {
        if (isEmailAlreadyExists(admin.getEmail())){
            throw  new DetailsAlreadyExistsException(admin.getEmail() + " already exists!");
        }
        return adminRepository.save(admin);
    }

    public void deleteAdmin(String email) {
        Admin admin = adminRepository.findByEmail(email);
        if (admin == null){
            throw new DetailsNotFoundException("Sorry, customer not found with email: " + email);
        }
        adminRepository.deleteById(admin.getId());
    }

    public Admin updatePassword(String email, String password) {
        if (!isEmailAlreadyExists(email)){
            throw new DetailsNotFoundException("Sorry, Admin not found with email: " + email);
        }
        Admin admin = adminRepository.findByEmail(email);
        admin.setPassword(password);
        return adminRepository.save(admin);
    }

    private boolean isEmailAlreadyExists(String email) {
        Admin admin = adminRepository.findByEmail(email);
        return admin != null;
    }

}
