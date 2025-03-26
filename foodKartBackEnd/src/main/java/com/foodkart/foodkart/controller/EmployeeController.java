package com.foodkart.foodkart.controller;

import com.foodkart.foodkart.model.Admin;
import com.foodkart.foodkart.model.Employee;
import com.foodkart.foodkart.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/employee")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping("/get-all-employees")
    public ResponseEntity<List<Employee>> getAllEmployees(){
        return new ResponseEntity<>(employeeService.getAllEmployees(), HttpStatus.FOUND);
    }

    // Add Employee
    @PostMapping("/add-employee")
    public ResponseEntity<Employee> addEmployee(@RequestBody Employee employee) {
        return ResponseEntity.ok(employeeService.addEmployee(employee));
    }

    // Get Employee by Name
    @GetMapping("/get-employee-by-name/{ename}")
    public ResponseEntity<List<Employee>> getEmployeeByName(@PathVariable String ename) {
        return ResponseEntity.ok(employeeService.getEmployeeByName(ename));
    }

    // Get Employee by Email
    @GetMapping("/get-employee-by-email/{email}")
    public ResponseEntity<Optional<Employee>> getEmployeeByEmail(@PathVariable String email) {
        return ResponseEntity.ok(employeeService.getEmployeeByEmail(email));
    }

    // Get Employee by Mobile
    @GetMapping("/get-employee-by-mobile/{mobile}")
    public ResponseEntity<Optional<Employee>> getEmployeeByMobile(@PathVariable Long mobile) {
        return ResponseEntity.ok(employeeService.getEmployeeByMobile(mobile));
    }

    // Update Employee
    @PutMapping("/update-employee/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee updatedEmployee) {
        return ResponseEntity.ok(employeeService.updateEmployee(id, updatedEmployee));
    }

    // Delete Employee
    @DeleteMapping("/delete-employee-by-email/{email}")
    public ResponseEntity<String> deleteEmployeeByEmail(@PathVariable String email) {
        employeeService.deleteEmployeeByEmail(email);
        return ResponseEntity.ok("Employee deleted successfully.");
    }
}
