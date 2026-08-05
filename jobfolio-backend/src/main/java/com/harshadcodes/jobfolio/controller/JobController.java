package com.harshadcodes.jobfolio.controller;

import com.harshadcodes.jobfolio.dto.request.JobSearchRequest;
import com.harshadcodes.jobfolio.dto.response.JobSearchResponse;
import com.harshadcodes.jobfolio.service.JobSearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
public class JobController {

    private final JobSearchService jobSearchService;

    @PostMapping("/search")
    public ResponseEntity<JobSearchResponse> search(@RequestBody JobSearchRequest request) {
        return ResponseEntity.ok(jobSearchService.searchJobs(request));
    }
}
