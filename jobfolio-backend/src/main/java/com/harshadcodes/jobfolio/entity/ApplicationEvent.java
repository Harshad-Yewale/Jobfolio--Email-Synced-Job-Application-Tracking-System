package com.harshadcodes.jobfolio.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "application_events")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long applicationId;

    @Enumerated(EnumType.STRING)
    private ApplicationStatus oldStatus;

    @Enumerated(EnumType.STRING)
    private ApplicationStatus newStatus;

    private String source = "MANUAL";

    private LocalDateTime createdAt = LocalDateTime.now();
}