package com.harshadcodes.jobfolio.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ConversionFunnelResponse {
    private long applied;
    private long received;
    private long assessment;
    private long interview;
    private long offer;
}