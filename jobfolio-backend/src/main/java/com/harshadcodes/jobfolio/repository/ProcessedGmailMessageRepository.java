package com.harshadcodes.jobfolio.repository;

import com.harshadcodes.jobfolio.entity.ProcessedGmailMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;

public interface ProcessedGmailMessageRepository extends JpaRepository<ProcessedGmailMessage, Long> {
    boolean existsByEmailConnectionIdAndGmailMessageId(Long emailConnectionId, String gmailMessageId);
    void deleteByProcessedAtBefore(LocalDateTime cutoff);
}