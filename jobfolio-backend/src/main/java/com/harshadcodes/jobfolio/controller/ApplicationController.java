package com.harshadcodes.jobfolio.controller;

import com.harshadcodes.jobfolio.dto.request.CreateApplicationRequest;
import com.harshadcodes.jobfolio.dto.request.UpdateStatusRequest;
import com.harshadcodes.jobfolio.dto.response.ApplicationEventResponse;
import com.harshadcodes.jobfolio.dto.response.ApplicationResponse;
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
    public ResponseEntity<ApplicationResponse> create(@Valid @RequestBody CreateApplicationRequest request) {
        Application application = applicationService.createApplication(request);
        return ResponseEntity.ok(ApplicationResponse.from(application));
    }

    @GetMapping
    public ResponseEntity<List<ApplicationResponse>> getAll() {
        List<ApplicationResponse> responses = applicationService.getMyApplications().stream()
                .map(ApplicationResponse::from)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApplicationResponse> getOne(@PathVariable Long id) {
        Application application = applicationService.getApplicationOwnedByUser(id);
        return ResponseEntity.ok(ApplicationResponse.from(application));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        applicationService.deleteApplication(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ApplicationResponse> updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody UpdateStatusRequest request) {
        Application updated = applicationStatusService.changeStatus(id, request.getStatus(), "MANUAL");
        return ResponseEntity.ok(ApplicationResponse.from(updated));
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