package com.harshadcodes.jobfolio.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class SavedJobResponse {
    private Long id;
    private String jobTitle;
    private String company;
    private String jobUrl;
    private String location;
    private String source;
    private LocalDateTime savedAt;

    public static SavedJobResponse from(com.harshadcodes.jobfolio.entity.SavedJob job) {
        return new SavedJobResponse(
                job.getId(), job.getJobTitle(), job.getCompany(),
                job.getJobUrl(), job.getLocation(), job.getSource(), job.getSavedAt()
        );
    }
}