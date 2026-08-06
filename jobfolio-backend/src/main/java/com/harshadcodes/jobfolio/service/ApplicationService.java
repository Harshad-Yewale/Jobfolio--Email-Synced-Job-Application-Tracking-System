package com.harshadcodes.jobfolio.service;

import com.harshadcodes.jobfolio.dto.request.CreateApplicationRequest;
import com.harshadcodes.jobfolio.entity.Application;
import com.harshadcodes.jobfolio.entity.ApplicationStatus;
import com.harshadcodes.jobfolio.exception.DuplicateApplicationException;
import com.harshadcodes.jobfolio.repository.ApplicationRepository;
import com.harshadcodes.jobfolio.util.AuthUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final AuthUtil authUtil;

    public Application createApplication(CreateApplicationRequest request) {
        Long userId = authUtil.getCurrentUserId();

        if (request.getJobUrl() != null) {
            List<Application> existing = applicationRepository.findByUserIdAndJobUrlAndStatusNotIn(
                    userId, request.getJobUrl(),
                    List.of(ApplicationStatus.ACCEPTED, ApplicationStatus.REJECTED)
            );

            if (!existing.isEmpty()) {
                throw new DuplicateApplicationException("You already have an active application for this job");
            }
        }

        Application application = new Application();
        application.setUserId(userId);
        application.setJobTitle(request.getJobTitle());
        application.setCompany(request.getCompany());
        application.setJobUrl(request.getJobUrl());
        application.setLocation(request.getLocation());
        application.setSource(request.getSource());

        return applicationRepository.save(application);
    }

    public List<Application> getMyApplications() {
        return applicationRepository.findByUserId(authUtil.getCurrentUserId());
    }

    public Application getApplicationOwnedByUser(Long id) {
        return applicationRepository.findByIdAndUserId(id, authUtil.getCurrentUserId())
                .orElseThrow(() -> new RuntimeException("Application not found"));
    }

    public void deleteApplication(Long id) {
        Application application = getApplicationOwnedByUser(id);
        applicationRepository.delete(application);
    }
}