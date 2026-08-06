package com.harshadcodes.jobfolio.service;

import com.harshadcodes.jobfolio.dto.request.CreateApplicationRequest;
import com.harshadcodes.jobfolio.dto.request.SaveJobRequest;
import com.harshadcodes.jobfolio.entity.Application;
import com.harshadcodes.jobfolio.entity.SavedJob;
import com.harshadcodes.jobfolio.repository.SavedJobRepository;
import com.harshadcodes.jobfolio.util.AuthUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SavedJobService {

    private final SavedJobRepository savedJobRepository;
    private final AuthUtil authUtil;
    private final ApplicationService applicationService;

    public SavedJob saveJob(SaveJobRequest request) {
        SavedJob savedJob = new SavedJob();
        savedJob.setUserId(authUtil.getCurrentUserId());
        savedJob.setJobTitle(request.getJobTitle());
        savedJob.setCompany(request.getCompany());
        savedJob.setJobUrl(request.getJobUrl());
        savedJob.setLocation(request.getLocation());
        savedJob.setSource(request.getSource());

        return savedJobRepository.save(savedJob);
    }

    public List<SavedJob> getMySavedJobs() {
        return savedJobRepository.findByUserId(authUtil.getCurrentUserId());
    }

    private SavedJob getSavedJobOwnedByUser(Long id) {
        SavedJob savedJob = savedJobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Saved job not found"));

        if (!savedJob.getUserId().equals(authUtil.getCurrentUserId())) {
            throw new RuntimeException("Saved job not found");
        }
        return savedJob;
    }

    public void deleteSavedJob(Long id) {
        SavedJob savedJob = getSavedJobOwnedByUser(id);
        savedJobRepository.deleteById(savedJob.getId());
    }

    public Application convertToApplication(Long savedJobId) {
        SavedJob savedJob = getSavedJobOwnedByUser(savedJobId);

        CreateApplicationRequest request = new CreateApplicationRequest();
        request.setJobTitle(savedJob.getJobTitle());
        request.setCompany(savedJob.getCompany());
        request.setJobUrl(savedJob.getJobUrl());
        request.setLocation(savedJob.getLocation());
        request.setSource(savedJob.getSource());

        Application application = applicationService.createApplication(request);

        savedJobRepository.deleteById(savedJobId);

        return application;
    }
}