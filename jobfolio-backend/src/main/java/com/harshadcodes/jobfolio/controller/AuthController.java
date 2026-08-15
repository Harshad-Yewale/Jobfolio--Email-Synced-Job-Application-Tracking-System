package com.harshadcodes.jobfolio.controller;

import com.harshadcodes.jobfolio.dto.request.LoginRequest;
import com.harshadcodes.jobfolio.dto.request.RegisterRequest;
import com.harshadcodes.jobfolio.dto.response.AuthResponse;
import com.harshadcodes.jobfolio.service.UserService;
import com.harshadcodes.jobfolio.util.JwtUtil;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request, HttpServletResponse response) {
        AuthResponse authResponse = userService.register(request);
        response.addCookie(jwtUtil.createJwtCookie(authResponse.getToken()));
        return ResponseEntity.ok(authResponse);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request, HttpServletResponse response) {
        AuthResponse authResponse = userService.login(request);
        response.addCookie(jwtUtil.createJwtCookie(authResponse.getToken()));
        return ResponseEntity.ok(authResponse);
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletResponse response) {
        response.addCookie(jwtUtil.createLogoutCookie());
        return ResponseEntity.noContent().build();
    }
}