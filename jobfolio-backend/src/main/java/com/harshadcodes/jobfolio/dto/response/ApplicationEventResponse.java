package com.harshadcodes.jobfolio.dto.response;

import com.harshadcodes.jobfolio.entity.ApplicationStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class ApplicationEventResponse {
    private ApplicationStatus oldStatus;
    private ApplicationStatus newStatus;
    private String source;
    private LocalDateTime createdAt;
}