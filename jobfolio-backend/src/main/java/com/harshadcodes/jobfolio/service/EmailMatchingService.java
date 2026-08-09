package com.harshadcodes.jobfolio.service;

import com.harshadcodes.jobfolio.dto.response.GmailMessageDto;
import com.harshadcodes.jobfolio.entity.Application;
import com.harshadcodes.jobfolio.entity.ApplicationStatus;
import com.harshadcodes.jobfolio.repository.ApplicationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EmailMatchingService {

    private final EmailClassifier emailClassifier;
    private final ApplicationRepository applicationRepository;

    private static final List<ApplicationStatus> TERMINAL_STATUSES =
            List.of(ApplicationStatus.ACCEPTED, ApplicationStatus.REJECTED);

     public MatchResult analyze(Long userId, GmailMessageDto message) {
        ApplicationStatus detectedStatus = emailClassifier.classify(message.getSubject(), message.getSnippet());

        if (detectedStatus == null) {
            return null;
        }

        List<Application> activeApplications =
                applicationRepository.findByUserIdAndStatusNotIn(userId, TERMINAL_STATUSES);

        String senderText = message.getFrom() == null ? "" : message.getFrom().toLowerCase();
        String subjectText = message.getSubject() == null ? "" : message.getSubject().toLowerCase();

        // Try matching against the sender's email/name first - most reliable signal
        Optional<Application> matched = activeApplications.stream()
                .filter(app -> senderText.contains(app.getCompany().toLowerCase()))
                .findFirst();

        // where the sender domain won't contain the company name, but the subject line usually does
        if (matched.isEmpty()) {
            matched = activeApplications.stream()
                    .filter(app -> subjectText.contains(app.getCompany().toLowerCase()))
                    .findFirst();
        }

         return matched.map(application -> new MatchResult(application, detectedStatus)).orElse(null);

     }

    public record MatchResult(Application application, ApplicationStatus newStatus) {}
}