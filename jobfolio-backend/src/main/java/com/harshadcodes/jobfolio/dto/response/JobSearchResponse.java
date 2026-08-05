package com.harshadcodes.jobfolio.dto.response;

import lombok.Data;

import java.util.List;

@Data
public class JobSearchResponse {

    private int count;
    private List<JobResponse> jobs;
}