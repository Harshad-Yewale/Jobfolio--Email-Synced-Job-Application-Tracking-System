package com.harshadcodes.jobfolio.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GmailMessageDto {
    private String id;
    private String subject;
    private String from;
    private String snippet;
}