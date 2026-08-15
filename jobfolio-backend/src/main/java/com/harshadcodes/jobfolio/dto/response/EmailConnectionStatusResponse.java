package com.harshadcodes.jobfolio.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class EmailConnectionStatusResponse {
    private String emailAddress;
    private boolean syncEnabled;
    private LocalDateTime lastSyncedAt;
    private long daysUntilLikelyExpiry;
    private boolean needsReconnectSoon;
}