package com.harshadcodes.jobfolio.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "applications")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private String jobTitle;
    private String company;
    private String jobUrl;
    private String location;
    private String source;

    @Enumerated(EnumType.STRING)
    private ApplicationStatus status = ApplicationStatus.APPLIED;

    private String lastStatusSource = "MANUAL";

    private LocalDateTime appliedDate = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();
}