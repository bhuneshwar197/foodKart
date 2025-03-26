package com.foodkart.foodkart.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Entity class for Employee table
 * Author: Simpson Alfred
 */
@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "employee")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;  // Auto-incremented primary key

    @Column(name = "ename", length = 50, nullable = false)
    private String ename;

    @Column(name = "empid", length = 50, nullable = false, unique = true)
    private String empid;

    @Column(name = "email", length = 300, nullable = false, unique = true)
    private String email;

    @Column(name = "address", length = 200)
    private String address;

    @Column(name = "mobile", nullable = false)
    private Long mobile;
}
