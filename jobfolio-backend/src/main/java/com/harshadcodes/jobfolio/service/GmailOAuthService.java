package com.harshadcodes.jobfolio.service;

import com.google.api.client.auth.oauth2.TokenResponse;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleRefreshTokenRequest;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.gmail.Gmail;
import com.harshadcodes.jobfolio.entity.EmailConnection;
import com.harshadcodes.jobfolio.repository.EmailConnectionRepository;
import com.harshadcodes.jobfolio.repository.UserRepository;
import com.harshadcodes.jobfolio.util.AuthUtil;
import com.harshadcodes.jobfolio.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.harshadcodes.jobfolio.entity.User;
import com.harshadcodes.jobfolio.repository.UserRepository;
import com.harshadcodes.jobfolio.util.JwtUtil;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GmailOAuthService {

    private final GoogleAuthorizationCodeFlow flow;
    private final EmailConnectionRepository emailConnectionRepository;
    private final EncryptionService encryptionService;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    @Value("${google.redirect-uri}")
    private String redirectUri;

    @Value("${google.client-id}")
    private String clientId;

    @Value("${google.client-secret}")
    private String clientSecret;

   /* public String buildAuthorizationUrl() {
        return flow.newAuthorizationUrl()
                .setRedirectUri(redirectUri)
                .build();
    }*/

   /* public void handleCallback(String code) throws Exception {
        GoogleTokenResponse tokenResponse = (GoogleTokenResponse) flow.newTokenRequest(code)
                .setRedirectUri(redirectUri)
                .execute();

        String accessToken = tokenResponse.getAccessToken();
        String refreshToken = tokenResponse.getRefreshToken();
        long expiresInSeconds = tokenResponse.getExpiresInSeconds();

        // Get the actual Gmail address this token belongs to
        String emailAddress = fetchConnectedEmailAddress(accessToken);

        Long userId = authUtil.getCurrentUserId();
        Optional<EmailConnection> existing = emailConnectionRepository.findByUserId(userId);

        EmailConnection connection = existing.orElse(new EmailConnection());
        connection.setUserId(userId);
        connection.setEmailAddress(emailAddress);
        connection.setAccessToken(encryptionService.encrypt(accessToken));

        // Google only sends a refresh token on the FIRST authorization - don't overwrite it with null on reconnect
        if (refreshToken != null) {
            connection.setRefreshToken(encryptionService.encrypt(refreshToken));
        }

        connection.setTokenExpiry(LocalDateTime.now().plusSeconds(expiresInSeconds));
        connection.setSyncEnabled(true);

        emailConnectionRepository.save(connection);
    }*/

    private String fetchConnectedEmailAddress(String accessToken) throws Exception {
        Gmail gmail = new Gmail.Builder(
                GoogleNetHttpTransport.newTrustedTransport(),
                GsonFactory.getDefaultInstance(),
                request -> request.getHeaders().setAuthorization("Bearer " + accessToken))
                .setApplicationName("Jobfolio")
                .build();

        return gmail.users().getProfile("me").execute().getEmailAddress();
    }

    public String buildAuthorizationUrl(String jwtToken) {
        return flow.newAuthorizationUrl()
                .setRedirectUri(redirectUri)
                .setState(jwtToken)
                .build();
    }

    public void handleCallback(String code, String state) throws Exception {
        GoogleTokenResponse tokenResponse = (GoogleTokenResponse) flow.newTokenRequest(code)
                .setRedirectUri(redirectUri)
                .execute();

        String accessToken = tokenResponse.getAccessToken();
        String refreshToken = tokenResponse.getRefreshToken();
        long expiresInSeconds = tokenResponse.getExpiresInSeconds();

        String emailAddress = fetchConnectedEmailAddress(accessToken);

        String userEmail = jwtUtil.extractEmail(state);
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Long userId = user.getId();

        Optional<EmailConnection> existing = emailConnectionRepository.findByUserId(userId);

        EmailConnection connection = existing.orElse(new EmailConnection());
        connection.setUserId(userId);
        connection.setEmailAddress(emailAddress);
        connection.setAccessToken(encryptionService.encrypt(accessToken));
        connection.setLastTokenRefreshAt(LocalDateTime.now());

        if (refreshToken != null) {
            connection.setRefreshToken(encryptionService.encrypt(refreshToken));
        }

        connection.setTokenExpiry(LocalDateTime.now().plusSeconds(expiresInSeconds));
        connection.setSyncEnabled(true);

        emailConnectionRepository.save(connection);
    }

    public String getValidAccessToken(EmailConnection connection) throws Exception {
        if (connection.getTokenExpiry().isAfter(LocalDateTime.now().plusMinutes(2))) {
            return encryptionService.decrypt(connection.getAccessToken());
        }

        String refreshToken = encryptionService.decrypt(connection.getRefreshToken());

        GoogleRefreshTokenRequest request = new GoogleRefreshTokenRequest(
                GoogleNetHttpTransport.newTrustedTransport(),
                GsonFactory.getDefaultInstance(),
                refreshToken,
                clientId,
                clientSecret
        );

        GoogleTokenResponse tokenResponse = request.execute();

        String newAccessToken = tokenResponse.getAccessToken();
        long expiresInSeconds = tokenResponse.getExpiresInSeconds();

        connection.setAccessToken(encryptionService.encrypt(newAccessToken));
        connection.setTokenExpiry(LocalDateTime.now().plusSeconds(expiresInSeconds));
        connection.setLastTokenRefreshAt(LocalDateTime.now());
        emailConnectionRepository.save(connection);

        return newAccessToken;
    }
}