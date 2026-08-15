package com.harshadcodes.jobfolio.service;

import com.harshadcodes.jobfolio.dto.request.JobSearchRequest;
import com.harshadcodes.jobfolio.dto.response.JobResponse;
import com.harshadcodes.jobfolio.dto.response.JobSearchResponse;
import com.harshadcodes.jobfolio.entity.ApplicationStatus;
import com.harshadcodes.jobfolio.repository.ApplicationRepository;
import com.harshadcodes.jobfolio.util.AuthUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JobSearchService {

    private final RestClient jobSearchRestClient;
    private final ApplicationRepository applicationRepository;
    private final AuthUtil authUtil;

    private static final List<ApplicationStatus> TERMINAL_STATUSES =
            List.of(ApplicationStatus.ACCEPTED, ApplicationStatus.REJECTED);

    public JobSearchResponse searchJobs(JobSearchRequest request) {
        JobSearchResponse response = jobSearchRestClient.post()
                .uri("/search")
                .body(request)
                .retrieve()
                .body(JobSearchResponse.class);

        markAlreadyAppliedJobs(response);

        return response;
    }

    private void markAlreadyAppliedJobs(JobSearchResponse response) {
        if (response == null || response.getJobs() == null) return;

        Long userId = authUtil.getCurrentUserId();

        Set<String> activeAppliedUrls = applicationRepository
                .findByUserIdAndStatusNotIn(userId, TERMINAL_STATUSES)
                .stream()
                .map(app -> app.getJobUrl())
                .filter(url -> url != null)
                .collect(Collectors.toSet());

        for (JobResponse job : response.getJobs()) {
            if (job.getJobUrl() != null && activeAppliedUrls.contains(job.getJobUrl())) {
                job.setAlreadyApplied(true);
            }
        }
    }
}