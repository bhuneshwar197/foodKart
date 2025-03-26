package com.foodkart.foodkart.repository;

import com.foodkart.foodkart.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    List<Employee> findByEname(String ename);
    Optional<Employee> findByEmail(String email);
    Optional<Employee> findByMobile(Long mobile);
    boolean existsByEmail(String email);
    boolean existsByEmpid(String email);
    @Transactional
    void deleteByEmail(String email);
}
