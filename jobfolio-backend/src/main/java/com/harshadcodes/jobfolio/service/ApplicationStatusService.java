package com.harshadcodes.jobfolio.service;

import com.harshadcodes.jobfolio.entity.Application;
import com.harshadcodes.jobfolio.entity.ApplicationEvent;
import com.harshadcodes.jobfolio.entity.ApplicationStatus;
import com.harshadcodes.jobfolio.exception.InvalidStatusTransitionException;
import com.harshadcodes.jobfolio.repository.ApplicationEventRepository;
import com.harshadcodes.jobfolio.repository.ApplicationRepository;
import com.harshadcodes.jobfolio.util.AuthUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ApplicationStatusService {

    private final ApplicationRepository applicationRepository;
    private final ApplicationEventRepository applicationEventRepository;
    private final AuthUtil authUtil;

    private static final Set<ApplicationStatus> TERMINAL_STATUSES =
            Set.of(ApplicationStatus.ACCEPTED, ApplicationStatus.REJECTED);

    // Used by controllers - identifies the user from the logged-in session
    public Application changeStatus(Long applicationId, ApplicationStatus newStatus, String source) {
        return changeStatusForUser(applicationId, authUtil.getCurrentUserId(), newStatus, source);
    }

    // Used by the background sync job - userId is passed in directly since there's no HTTP session
    public Application changeStatusForUser(Long applicationId, Long userId, ApplicationStatus newStatus, String source) {
        Application application = applicationRepository.findByIdAndUserId(applicationId, userId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        ApplicationStatus oldStatus = application.getStatus();

        if (TERMINAL_STATUSES.contains(oldStatus)) {
            throw new InvalidStatusTransitionException(
                    "Cannot change status - application is already " + oldStatus);
        }

        if (oldStatus == newStatus) {
            throw new InvalidStatusTransitionException("Application is already " + newStatus);
        }

        application.setStatus(newStatus);
        application.setUpdatedAt(LocalDateTime.now());
        applicationRepository.save(application);

        ApplicationEvent event = new ApplicationEvent();
        event.setApplicationId(applicationId);
        event.setOldStatus(oldStatus);
        event.setNewStatus(newStatus);
        event.setSource(source);
        applicationEventRepository.save(event);

        return application;
    }

    public List<ApplicationEvent> getTimeline(Long applicationId) {
        applicationRepository.findByIdAndUserId(applicationId, authUtil.getCurrentUserId())
                .orElseThrow(() -> new RuntimeException("Application not found"));
        return applicationEventRepository.findByApplicationIdOrderByCreatedAtAsc(applicationId);
    }
}