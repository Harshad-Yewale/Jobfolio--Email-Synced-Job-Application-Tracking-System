package com.harshadcodes.jobfolio.scheduler;

import com.harshadcodes.jobfolio.repository.ProcessedGmailMessageRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class ProcessedMessageCleanupJob {

    private static final Logger log = LoggerFactory.getLogger(ProcessedMessageCleanupJob.class);

    private final ProcessedGmailMessageRepository processedGmailMessageRepository;

    // Runs once a day - rows this old are far behind the sync pointer,
    // so we'll never need to check against them again
    @Scheduled(fixedRate = 24 * 60 * 60 * 1000)
    public void cleanupOldRecords() {
        LocalDateTime cutoff = LocalDateTime.now().minusDays(14);
        processedGmailMessageRepository.deleteByProcessedAtBefore(cutoff);
        log.info("Cleaned up processed Gmail message records older than {}", cutoff);
    }
}