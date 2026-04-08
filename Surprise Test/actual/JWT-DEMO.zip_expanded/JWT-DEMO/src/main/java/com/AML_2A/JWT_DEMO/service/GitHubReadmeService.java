package com.AML_2A.JWT_DEMO.service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.stereotype.Service;

@Service
public class GitHubReadmeService {
    private final HttpClient httpClient = HttpClient.newHttpClient();

    public String fetchReadme(String githubLink) {
        try {
            RepoSlug slug = parseRepoSlug(githubLink);
            if (slug == null) return null;

            String apiUrl =
                    "https://api.github.com/repos/" + slug.owner + "/" + slug.repo + "/readme";

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(apiUrl))
                    .header("Accept", "application/vnd.github+json")
                    .header("User-Agent", "project-review-platform")
                    .GET()
                    .build();

            HttpResponse<String> response =
                    httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() != 200) return null;

            String contentBase64 = extractJsonString(response.body(), "content");
            if (contentBase64.isEmpty()) return null;

            // GitHub returns base64 content with line breaks (often as escaped "\n" in JSON).
            contentBase64 = contentBase64.replace("\\n", "")
                                           .replace("\n", "")
                                           .replace("\r", "")
                                           .replaceAll("\\s", "");
            byte[] decodedBytes = Base64.getDecoder().decode(contentBase64);
            return new String(decodedBytes, StandardCharsets.UTF_8);
        } catch (Exception e) {
            // For assignment UX: README fetching should never break submission.
            return null;
        }
    }

    private static String extractJsonString(String json, String key) {
        // Very small, purpose-built extractor for GitHub API response:
        // { "content": "<base64 string>" }
        // We avoid adding Jackson dependencies for student environments.
        Pattern p = Pattern.compile("\"" + Pattern.quote(key) + "\"\\s*:\\s*\"(.*?)\"", Pattern.DOTALL);
        Matcher m = p.matcher(json);
        if (!m.find()) return "";

        String raw = m.group(1);
        // Minimal JSON unescaping needed for GitHub base64.
        raw = raw.replace("\\n", "\n")
                 .replace("\\r", "\r")
                 .replace("\\t", "\t")
                 .replace("\\\"", "\"")
                 .replace("\\\\", "\\");
        return raw;
    }

    private static class RepoSlug {
        final String owner;
        final String repo;

        RepoSlug(String owner, String repo) {
            this.owner = owner;
            this.repo = repo;
        }
    }

    private RepoSlug parseRepoSlug(String githubLink) {
        if (githubLink == null) return null;
        String link = githubLink.trim();
        if (link.isEmpty()) return null;

        try {
            URI uri = URI.create(link);
            String host = uri.getHost();
            if (host == null) return null;

            // Support github.com links only.
            if (!host.equalsIgnoreCase("github.com")) return null;

            String path = uri.getPath(); // e.g. /owner/repo/tree/main/...
            if (path == null) return null;

            String[] parts = path.split("/");
            // parts contains empties because path starts with "/"
            // Example: ["", "Hitanshu-Kandpal", "FullStack2", "tree", "main", ...]
            int first = -1;
            int second = -1;
            for (int i = 0; i < parts.length; i++) {
                if (parts[i] == null || parts[i].isBlank()) continue;
                if (first == -1) first = i;
                else {
                    second = i;
                    break;
                }
            }

            if (first == -1 || second == -1) return null;

            String owner = parts[first];
            String repo = parts[second];
            if (repo != null && repo.endsWith(".git")) {
                repo = repo.substring(0, repo.length() - 4);
            }

            if (owner == null || owner.isBlank() || repo == null || repo.isBlank()) return null;
            return new RepoSlug(owner, repo);
        } catch (Exception e) {
            return null;
        }
    }
}

