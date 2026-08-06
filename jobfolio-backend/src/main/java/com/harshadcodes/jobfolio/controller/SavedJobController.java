package com.harshadcodes.jobfolio.controller;

import com.harshadcodes.jobfolio.dto.request.SaveJobRequest;
import com.harshadcodes.jobfolio.entity.Application;
import com.harshadcodes.jobfolio.entity.SavedJob;
import com.harshadcodes.jobfolio.service.SavedJobService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/saved-jobs")
@RequiredArgsConstructor
public class SavedJobController {

    private final SavedJobService savedJobService;

    @PostMapping
    public ResponseEntity<SavedJob> save(@Valid @RequestBody SaveJobRequest request) {
        return ResponseEntity.ok(savedJobService.saveJob(request));
    }

    @GetMapping
    public ResponseEntity<List<SavedJob>> getAll() {
        return ResponseEntity.ok(savedJobService.getMySavedJobs());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        savedJobService.deleteSavedJob(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/apply")
    public ResponseEntity<Application> applyToSavedJob(@PathVariable Long id) {
        return ResponseEntity.ok(savedJobService.convertToApplication(id));
    }
}