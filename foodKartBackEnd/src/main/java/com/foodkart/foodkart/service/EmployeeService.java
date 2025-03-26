package com.foodkart.foodkart.service;

import com.foodkart.foodkart.exception.DetailsAlreadyExistsException;
import com.foodkart.foodkart.exception.DetailsNotFoundException;
import com.foodkart.foodkart.model.Employee;
import com.foodkart.foodkart.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    // Add a new employee
    public Employee addEmployee(Employee employee) {
        if(employeeRepository.existsByEmail(employee.getEmail()) || employeeRepository.existsByEmpid(employee.getEmpid())) {
            throw  new DetailsAlreadyExistsException(employee.getEmail() + " already exists!");
        }
        return employeeRepository.save(employee);
    }

    // Get employees by name
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public List<Employee> getEmployeeByName(String ename) {
        return employeeRepository.findByEname(ename);
    }

    // Get employee by email
    public Optional<Employee> getEmployeeByEmail(String email) {
        return employeeRepository.findByEmail(email);
    }

    // Get employee by mobile
    public Optional<Employee> getEmployeeByMobile(Long mobile) {
        return employeeRepository.findByMobile(mobile);
    }

    // Update employee details
    public Employee updateEmployee(Long id, Employee updatedEmployee) {
        return employeeRepository.findById(id)
                .map(employee -> {
                    employee.setEname(updatedEmployee.getEname());
                    employee.setEmpid(updatedEmployee.getEmpid());
                    employee.setEmail(updatedEmployee.getEmail());
                    employee.setAddress(updatedEmployee.getAddress());
                    employee.setMobile(updatedEmployee.getMobile());
                    return employeeRepository.save(employee);
                }).orElseThrow(() -> new RuntimeException("Employee not found with ID: " + id));
    }

    // Delete employee by ID
    public void deleteEmployeeByEmail(String email) {
        if(!employeeRepository.existsByEmail(email)) {
            throw  new DetailsNotFoundException(email+ " doesn't exist for any employee!");
        }
        employeeRepository.deleteByEmail(email);
    }
}
