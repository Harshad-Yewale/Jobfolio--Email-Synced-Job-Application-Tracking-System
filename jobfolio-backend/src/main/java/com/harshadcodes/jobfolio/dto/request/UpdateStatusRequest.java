package com.harshadcodes.jobfolio.dto.request;

import com.harshadcodes.jobfolio.entity.ApplicationStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateStatusRequest {

    @NotNull(message = "Status is required")
    private ApplicationStatus status;
}