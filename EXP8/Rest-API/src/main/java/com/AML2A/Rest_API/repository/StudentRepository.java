package com.AML2A.Rest_API.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import com.AML2A.Rest_API.model.Student;



public interface StudentRepository extends JpaRepository<Student,Integer>{
}