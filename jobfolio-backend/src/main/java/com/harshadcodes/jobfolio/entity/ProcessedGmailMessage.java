package com.harshadcodes.jobfolio.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "processed_gmail_messages")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProcessedGmailMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long emailConnectionId;
    private String gmailMessageId;

    private LocalDateTime processedAt = LocalDateTime.now();
}