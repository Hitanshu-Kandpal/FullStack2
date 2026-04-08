package com.AML_2A.JWT_DEMO.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.AML_2A.JWT_DEMO.model.Project;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByUsername(String username);
}