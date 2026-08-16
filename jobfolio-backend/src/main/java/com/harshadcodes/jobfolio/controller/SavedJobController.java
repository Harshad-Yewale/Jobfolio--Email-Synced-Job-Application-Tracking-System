package com.harshadcodes.jobfolio.controller;

import com.harshadcodes.jobfolio.dto.request.SaveJobRequest;
import com.harshadcodes.jobfolio.dto.response.ApplicationResponse;
import com.harshadcodes.jobfolio.dto.response.SavedJobResponse;
import com.harshadcodes.jobfolio.entity.Application;
import com.harshadcodes.jobfolio.entity.SavedJob;
import com.harshadcodes.jobfolio.service.SavedJobService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/saved-jobs")
@RequiredArgsConstructor
public class SavedJobController {

    private final SavedJobService savedJobService;

    @PostMapping
    public ResponseEntity<SavedJobResponse> save(@Valid @RequestBody SaveJobRequest request) {
        SavedJob job =  savedJobService.saveJob(request);
        return ResponseEntity.ok(SavedJobResponse.from(job));
    }

    @GetMapping
    public ResponseEntity<List<SavedJobResponse>> getAll() {
        List<SavedJobResponse> responses = savedJobService.getMySavedJobs().stream()
                .map(SavedJobResponse::from)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        savedJobService.deleteSavedJob(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/apply")
    public ResponseEntity<ApplicationResponse> applyToSavedJob(@PathVariable Long id) {
        Application application= savedJobService.convertToApplication(id);
        return ResponseEntity.ok(ApplicationResponse.from(application));
    }
}