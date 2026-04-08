package com.AML_2A.JWT_DEMO.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import com.AML_2A.JWT_DEMO.model.Project;
import com.AML_2A.JWT_DEMO.repository.ProjectRepository;
import com.AML_2A.JWT_DEMO.service.GitHubReadmeService;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ProjectController {

    @Autowired
    private ProjectRepository repo;

    @Autowired
    private GitHubReadmeService gitHubReadmeService;

    @PostMapping
    public Project create(@RequestBody Project p) {
        p.setStatus("PENDING");
        return repo.save(p);
    }

    @GetMapping
    public List<Project> getAll() {
        return repo.findAll();
    }

    @GetMapping("/my/{username}")
    public List<Project> getMy(@PathVariable String username) {
        return repo.findByUsername(username);
    }

    @PutMapping("/{id}")
    public Project update(@PathVariable Long id, @RequestBody Project updated) {
        Project p = repo.findById(id).orElseThrow();

        p.setStatus(updated.getStatus());
        p.setFeedback(updated.getFeedback());

        return repo.save(p);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        if (!repo.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Project not found.");
        }
        repo.deleteById(id);
    }
}