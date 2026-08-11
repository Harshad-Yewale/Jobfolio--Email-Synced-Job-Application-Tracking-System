package com.harshadcodes.jobfolio.controller;

import com.harshadcodes.jobfolio.dto.response.ConversionFunnelResponse;
import com.harshadcodes.jobfolio.dto.response.DashboardSummaryResponse;
import com.harshadcodes.jobfolio.dto.response.WeeklyApplicationsResponse;
import com.harshadcodes.jobfolio.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/summary")
    public ResponseEntity<DashboardSummaryResponse> getSummary() {
        return ResponseEntity.ok(dashboardService.getSummary());
    }

    @GetMapping("/funnel")
    public ResponseEntity<ConversionFunnelResponse> getFunnel() {
        return ResponseEntity.ok(dashboardService.getConversionFunnel());
    }

    @GetMapping("/weekly")
    public ResponseEntity<List<WeeklyApplicationsResponse>> getWeekly() {
        return ResponseEntity.ok(dashboardService.getWeeklyApplications());
    }
}