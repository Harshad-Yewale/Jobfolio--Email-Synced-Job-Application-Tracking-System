package com.harshadcodes.jobfolio.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SaveJobRequest {

    @NotBlank(message = "Job title is required")
    private String jobTitle;

    @NotBlank(message = "Company is required")
    private String company;

    private String jobUrl;
    private String location;
    private String source;
}