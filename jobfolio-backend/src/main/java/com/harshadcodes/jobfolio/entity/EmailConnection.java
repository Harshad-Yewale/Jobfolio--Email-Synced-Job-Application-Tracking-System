package com.harshadcodes.jobfolio.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "email_connections")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmailConnection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private String emailAddress;

    @Column(columnDefinition = "TEXT")
    private String accessToken;

    @Column(columnDefinition = "TEXT")
    private String refreshToken;

    private LocalDateTime tokenExpiry;
    private LocalDateTime lastSyncedAt;

    private boolean syncEnabled = true;

    private LocalDateTime lastTokenRefreshAt;

    private LocalDateTime connectedAt = LocalDateTime.now();
}