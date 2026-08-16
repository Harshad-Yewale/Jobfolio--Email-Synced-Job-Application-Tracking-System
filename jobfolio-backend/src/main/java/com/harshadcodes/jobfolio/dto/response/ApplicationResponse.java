package com.harshadcodes.jobfolio.dto.response;

import com.harshadcodes.jobfolio.entity.ApplicationStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class ApplicationResponse {
    private Long id;
    private String jobTitle;
    private String company;
    private String jobUrl;
    private String location;
    private String source;
    private ApplicationStatus status;
    private String lastStatusSource;
    private LocalDateTime appliedDate;
    private LocalDateTime updatedAt;

    public static ApplicationResponse from(com.harshadcodes.jobfolio.entity.Application app) {
        return new ApplicationResponse(
                app.getId(), app.getJobTitle(), app.getCompany(), app.getJobUrl(),
                app.getLocation(), app.getSource(), app.getStatus(), app.getLastStatusSource(),
                app.getAppliedDate(), app.getUpdatedAt()
        );
    }
}