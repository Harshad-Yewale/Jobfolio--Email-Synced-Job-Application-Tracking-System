package com.harshadcodes.jobfolio.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class WeeklyApplicationsResponse {
    private String weekLabel; // e.g. "Jul 28 - Aug 3"
    private long count;
}