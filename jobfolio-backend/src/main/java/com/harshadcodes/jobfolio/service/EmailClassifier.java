package com.harshadcodes.jobfolio.service;

import com.harshadcodes.jobfolio.entity.ApplicationStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmailClassifier {

    private static final List<String> REJECTED_KEYWORDS = List.of(
            "unfortunately", "not moving forward", "other candidates",
            "not selected", "regret to inform", "will not be proceeding", "decided not to"
    );

    private static final List<String> OFFER_KEYWORDS = List.of(
            "pleased to offer", "job offer", "offer letter", "excited to extend an offer"
    );

    private static final List<String> INTERVIEW_KEYWORDS = List.of(
            "interview", "schedule a call", "invite you to interview", "meet with the team"
    );

    private static final List<String> ASSESSMENT_KEYWORDS = List.of(
            "assessment", "coding test", "online test", "next round",
            "technical round", "hackerrank", "codility"
    );

    private static final List<String> RECEIVED_KEYWORDS = List.of(
            "received your application", "thank you for applying",
            "application received", "we have received"
    );

    // Returns null if nothing matches - not every email is status-relevant
    public ApplicationStatus classify(String subject, String snippet) {
        String text = ((subject == null ? "" : subject) + " " + (snippet == null ? "" : snippet)).toLowerCase();

        if (containsAny(text, REJECTED_KEYWORDS)) return ApplicationStatus.REJECTED;
        if (containsAny(text, OFFER_KEYWORDS)) return ApplicationStatus.OFFER;
        if (containsAny(text, INTERVIEW_KEYWORDS)) return ApplicationStatus.INTERVIEW;
        if (containsAny(text, ASSESSMENT_KEYWORDS)) return ApplicationStatus.ASSESSMENT;
        if (containsAny(text, RECEIVED_KEYWORDS)) return ApplicationStatus.RECEIVED;

        return null;
    }

    private boolean containsAny(String text, List<String> keywords) {
        return keywords.stream().anyMatch(text::contains);
    }
}