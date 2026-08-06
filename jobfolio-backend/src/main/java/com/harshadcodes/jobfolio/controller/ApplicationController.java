package com.harshadcodes.jobfolio.controller;

import com.harshadcodes.jobfolio.dto.request.CreateApplicationRequest;
import com.harshadcodes.jobfolio.dto.request.UpdateStatusRequest;
import com.harshadcodes.jobfolio.dto.response.ApplicationEventResponse;
import com.harshadcodes.jobfolio.entity.Application;
import com.harshadcodes.jobfolio.entity.ApplicationEvent;
import com.harshadcodes.jobfolio.service.ApplicationService;
import com.harshadcodes.jobfolio.service.ApplicationStatusService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
public class ApplicationController {

    private final ApplicationService applicationService;
    private final ApplicationStatusService applicationStatusService;

    @PostMapping
    public ResponseEntity<Application> create(@Valid @RequestBody CreateApplicationRequest request) {
        return ResponseEntity.ok(applicationService.createApplication(request));
    }

    @GetMapping
    public ResponseEntity<List<Application>> getAll() {
        return ResponseEntity.ok(applicationService.getMyApplications());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Application> getOne(@PathVariable Long id) {
        return ResponseEntity.ok(applicationService.getApplicationOwnedByUser(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        applicationService.deleteApplication(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Application> updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody UpdateStatusRequest request) {
        Application updated = applicationStatusService.changeStatus(id, request.getStatus(), "MANUAL");
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/{id}/timeline")
    public ResponseEntity<List<ApplicationEventResponse>> getTimeline(@PathVariable Long id) {
        List<ApplicationEvent> events = applicationStatusService.getTimeline(id);

        List<ApplicationEventResponse> response = events.stream()
                .map(e -> new ApplicationEventResponse(
                        e.getOldStatus(), e.getNewStatus(), e.getSource(), e.getCreatedAt()))
                .collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }
}