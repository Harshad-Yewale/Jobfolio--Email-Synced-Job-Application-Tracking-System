package com.harshadcodes.jobfolio.scheduler;

import com.harshadcodes.jobfolio.dto.response.GmailMessageDto;
import com.harshadcodes.jobfolio.entity.EmailConnection;
import com.harshadcodes.jobfolio.repository.EmailConnectionRepository;
import com.harshadcodes.jobfolio.service.ApplicationStatusService;
import com.harshadcodes.jobfolio.service.EmailMatchingService;
import com.harshadcodes.jobfolio.service.GmailApiService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class EmailSyncJob {

    private static final Logger log = LoggerFactory.getLogger(EmailSyncJob.class);

    private final EmailConnectionRepository emailConnectionRepository;
    private final GmailApiService gmailApiService;
    private final EmailMatchingService emailMatchingService;
    private final ApplicationStatusService applicationStatusService;

    // Runs every 5 minutes
    @Scheduled(fixedRate = 5 * 60 * 1000)
    public void syncAllConnectedAccounts() {
        List<EmailConnection> connections = emailConnectionRepository.findBySyncEnabledTrue();

        for (EmailConnection connection : connections) {
            try {
                syncOneAccount(connection);
            } catch (Exception e) {
                // One user's sync failing (e.g. expired refresh token) shouldn't crash the whole job
                log.error("Email sync failed for user {}: {}", connection.getUserId(), e.getMessage());
            }
        }
    }

    public void syncOneAccount(EmailConnection connection) throws Exception {
        List<GmailMessageDto> messages = gmailApiService.fetchRecentMessages(connection, 20);

        for (GmailMessageDto message : messages) {
            EmailMatchingService.MatchResult result =
                    emailMatchingService.analyze(connection.getUserId(), message);

            if (result == null) {
                continue; // not relevant to any tracked application
            }

            try {
                applicationStatusService.changeStatusForUser(
                        result.application().getId(),
                        connection.getUserId(),
                        result.newStatus(),
                        "EMAIL_SYNC"
                );
                log.info("Auto-updated application {} to {} based on email sync",
                        result.application().getId(), result.newStatus());
            } catch (Exception statusChangeError) {
                // e.g. InvalidStatusTransitionException if already in a terminal state -
                // not a real error, just means this email doesn't apply anymore
                log.debug("Skipped status update for application {}: {}",
                        result.application().getId(), statusChangeError.getMessage());
            }
        }

        connection.setLastSyncedAt(LocalDateTime.now());
        emailConnectionRepository.save(connection);
    }
}