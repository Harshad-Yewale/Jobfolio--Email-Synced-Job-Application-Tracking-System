package com.harshadcodes.jobfolio.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DashboardSummaryResponse {
    private long totalApplications;
    private long activeApplications;
    private long interviews;
    private long offersReceived;
    private long offersAccepted;
    private double successRate; // percentage, e.g. 19.0 for 19%
}