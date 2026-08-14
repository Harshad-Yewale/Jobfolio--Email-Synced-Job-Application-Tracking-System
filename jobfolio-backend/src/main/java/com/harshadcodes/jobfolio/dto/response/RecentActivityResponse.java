package com.harshadcodes.jobfolio.dto.response;

import com.harshadcodes.jobfolio.entity.ApplicationStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class RecentActivityResponse {
    private Long applicationId;
    private String company;
    private String jobTitle;
    private ApplicationStatus oldStatus;
    private ApplicationStatus newStatus;
    private String source;
    private LocalDateTime createdAt;
}