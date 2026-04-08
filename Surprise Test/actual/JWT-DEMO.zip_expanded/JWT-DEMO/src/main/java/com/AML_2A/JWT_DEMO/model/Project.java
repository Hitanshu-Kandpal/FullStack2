package com.AML_2A.JWT_DEMO.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String githubLink;
    private String status;
    private String feedback;
    @Lob
    private String readmeContent;
    private String username;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getGithubLink() { return githubLink; }
    public void setGithubLink(String githubLink) { this.githubLink = githubLink; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getFeedback() { return feedback; }
    public void setFeedback(String feedback) { this.feedback = feedback; }

    public String getReadmeContent() { return readmeContent; }
    public void setReadmeContent(String readmeContent) { this.readmeContent = readmeContent; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
}