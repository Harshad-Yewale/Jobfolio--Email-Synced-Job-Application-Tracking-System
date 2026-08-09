package com.harshadcodes.jobfolio.controller;

import com.harshadcodes.jobfolio.entity.EmailConnection;
import com.harshadcodes.jobfolio.repository.EmailConnectionRepository;
import com.harshadcodes.jobfolio.scheduler.EmailSyncJob;
import com.harshadcodes.jobfolio.util.AuthUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/email")
@RequiredArgsConstructor
public class EmailSyncController {

    private final EmailSyncJob emailSyncJob;
    private final EmailConnectionRepository emailConnectionRepository;
    private final AuthUtil authUtil;

    @PostMapping("/sync-now")
    public ResponseEntity<String> syncNow() throws Exception {
        Long userId = authUtil.getCurrentUserId();
        EmailConnection connection = emailConnectionRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("No Gmail connection found"));

        emailSyncJob.syncOneAccount(connection);

        return ResponseEntity.ok("Sync completed - check your applications and console logs");
    }
}