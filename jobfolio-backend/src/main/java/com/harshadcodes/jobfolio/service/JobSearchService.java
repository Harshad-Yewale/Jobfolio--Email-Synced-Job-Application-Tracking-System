package com.harshadcodes.jobfolio.service;

import com.harshadcodes.jobfolio.dto.request.JobSearchRequest;
import com.harshadcodes.jobfolio.dto.response.JobSearchResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
@RequiredArgsConstructor
public class JobSearchService {

    private final RestClient jobSearchRestClient;

    public JobSearchResponse searchJobs(JobSearchRequest request) {
        return jobSearchRestClient.post()
                .uri("/search")
                .body(request)
                .retrieve()
                .body(JobSearchResponse.class);
    }
}