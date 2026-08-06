package com.harshadcodes.jobfolio.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class JobSearchRequest {

    @JsonProperty("search_term")
    private String searchTerm;

    private String location = "India";

    @JsonProperty("results_wanted")
    private Integer resultsWanted = 15;

    @JsonProperty("site_names")
    private List<String> siteNames = List.of("indeed", "linkedin");

    @JsonProperty("hours_old")
    private Integer hoursOld;
}