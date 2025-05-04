package com.foodkart.foodkart.controller;

import com.foodkart.foodkart.model.Admin;
import com.foodkart.foodkart.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Simpson Alfred
 */
@CrossOrigin("http://localhost:3000") //allowing client application to consume the backed
@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/get-all-admins")
    public ResponseEntity<List<Admin>> getAllAdmins(){
        return new ResponseEntity<>(adminService.getAllAdmins(), HttpStatus.FOUND);
    }

    @PostMapping("/create-admin")
    public Admin createAdmin(@RequestBody Admin admin){
        return adminService.createAdmin(admin);
    }

    @DeleteMapping("/delete-admin/{email}")
    public void deleteAdmin(@PathVariable String email){
        adminService.deleteAdmin(email);
    }

    @PutMapping("/update-password")
    public Admin updatePassword(@RequestParam (required = false) String email, @RequestParam(required = false) String password) {
        return adminService.updatePassword(email, password);
    }
}
