package com.harshadcodes.jobfolio.controller;

import com.harshadcodes.jobfolio.dto.response.EmailConnectionStatusResponse;
import com.harshadcodes.jobfolio.dto.response.TokenResponse;
import com.harshadcodes.jobfolio.entity.EmailConnection;
import com.harshadcodes.jobfolio.service.EmailConnectionService;
import com.harshadcodes.jobfolio.service.GmailOAuthService;
import com.harshadcodes.jobfolio.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;

@RestController
@RequestMapping("/api/email")
@RequiredArgsConstructor
public class EmailConnectionController {

    private final GmailOAuthService gmailOAuthService;
    private final JwtUtil jwtUtil;
    private final EmailConnectionService emailConnectionService;

    @GetMapping("/oauth2/authorize")
    public void authorize(@RequestParam String token, HttpServletResponse response) throws IOException {
        if (!jwtUtil.isTokenValid(token)) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid or expired token");
            return;
        }

        String url = gmailOAuthService.buildAuthorizationUrl(token);
        response.sendRedirect(url);
    }

    @GetMapping("/oauth2/callback")
    public void callback(@RequestParam String code, @RequestParam String state, HttpServletResponse response) throws Exception {
        gmailOAuthService.handleCallback(code, state);
        response.sendRedirect("http://localhost:5173/settings?gmail=connected");
    }

    @GetMapping("/token")
    public ResponseEntity<TokenResponse>getToken(HttpServletRequest request) {
        String token = jwtUtil.extractTokenFromCookies(request);
        if (token == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token");
        }
        return  new ResponseEntity<>(new TokenResponse(token), HttpStatus.OK);
    }


    @GetMapping("/status")
    public ResponseEntity<EmailConnectionStatusResponse> getStatus() {
        return ResponseEntity.ok(emailConnectionService.getConnectionStatus());
    }

    @DeleteMapping("/disconnect")
    public ResponseEntity<Void> disconnect() {
        emailConnectionService.disconnect();
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/pause")
    public ResponseEntity<Void> pauseSync() {
        emailConnectionService.pauseSync();
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/resume")
    public ResponseEntity<Void> resumeSync() {
        emailConnectionService.resumeSync();
        return ResponseEntity.noContent().build();
    }


}