package com.harshadcodes.jobfolio.service;

import com.harshadcodes.jobfolio.dto.response.EmailConnectionStatusResponse;
import com.harshadcodes.jobfolio.entity.EmailConnection;
import com.harshadcodes.jobfolio.repository.EmailConnectionRepository;
import com.harshadcodes.jobfolio.util.AuthUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Service
@RequiredArgsConstructor
public class EmailConnectionService {

    private final EmailConnectionRepository emailConnectionRepository;
    private final AuthUtil authUtil;

    public EmailConnection getMyConnection() {
        return emailConnectionRepository.findByUserId(authUtil.getCurrentUserId())
                .orElseThrow(() -> new RuntimeException("No Gmail connection found"));
    }

    public EmailConnectionStatusResponse getConnectionStatus() {
        EmailConnection connection = getMyConnection();

        LocalDateTime refreshBaseline = connection.getLastTokenRefreshAt() != null
                ? connection.getLastTokenRefreshAt()
                : connection.getConnectedAt();

        long daysSinceRefresh = ChronoUnit.DAYS.between(refreshBaseline, LocalDateTime.now());
        long daysUntilLikelyExpiry = 7 - daysSinceRefresh;

        return new EmailConnectionStatusResponse(
                connection.getEmailAddress(),
                connection.isSyncEnabled(),
                connection.getLastSyncedAt(),
                daysUntilLikelyExpiry,
                daysUntilLikelyExpiry <= 2
        );
    }

    public void disconnect() {
        EmailConnection connection = getMyConnection();
        emailConnectionRepository.delete(connection);
    }

    public void pauseSync() {
        EmailConnection connection = getMyConnection();
        connection.setSyncEnabled(false);
        emailConnectionRepository.save(connection);
    }

    public void resumeSync() {
        EmailConnection connection = getMyConnection();
        connection.setSyncEnabled(true);
        emailConnectionRepository.save(connection);
    }
}