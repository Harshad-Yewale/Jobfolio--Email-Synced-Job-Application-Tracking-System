package com.harshadcodes.jobfolio.controller;

import com.harshadcodes.jobfolio.service.GmailOAuthService;
import com.harshadcodes.jobfolio.util.JwtUtil;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/email")
@RequiredArgsConstructor
public class EmailConnectionController {

    private final GmailOAuthService gmailOAuthService;
    private final JwtUtil jwtUtil;

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
    public String callback(@RequestParam String code, @RequestParam String state) throws Exception {
        gmailOAuthService.handleCallback(code, state);
        return "Gmail connected successfully! You can close this tab.";
    }
}