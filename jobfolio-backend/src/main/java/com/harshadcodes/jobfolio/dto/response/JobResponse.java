package com.harshadcodes.jobfolio.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class JobResponse {

    private String title;
    private String company;
    private String location;

    @JsonProperty("job_url")
    private String jobUrl;
    private String site;

    @JsonProperty("date_posted")
    private String datePosted;
    private String description;

    private boolean alreadyApplied;
}