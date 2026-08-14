package com.harshadcodes.jobfolio.service;

import com.harshadcodes.jobfolio.dto.response.ConversionFunnelResponse;
import com.harshadcodes.jobfolio.dto.response.DashboardSummaryResponse;
import com.harshadcodes.jobfolio.dto.response.RecentActivityResponse;
import com.harshadcodes.jobfolio.dto.response.WeeklyApplicationsResponse;
import com.harshadcodes.jobfolio.entity.Application;
import com.harshadcodes.jobfolio.entity.ApplicationEvent;
import com.harshadcodes.jobfolio.entity.ApplicationStatus;
import com.harshadcodes.jobfolio.repository.ApplicationEventRepository;
import com.harshadcodes.jobfolio.repository.ApplicationRepository;
import com.harshadcodes.jobfolio.util.AuthUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final ApplicationRepository applicationRepository;
    private final AuthUtil authUtil;

    private static final List<ApplicationStatus> TERMINAL_STATUSES =
            List.of(ApplicationStatus.ACCEPTED, ApplicationStatus.REJECTED);

    public DashboardSummaryResponse getSummary() {
        Long userId = authUtil.getCurrentUserId();

        long total = applicationRepository.countByUserId(userId);
        long active = applicationRepository.countByUserIdAndStatusNotIn(userId, TERMINAL_STATUSES);
        long interviews = applicationRepository.countByUserIdAndStatus(userId, ApplicationStatus.INTERVIEW);
        long offersReceived = applicationRepository.countByUserIdAndStatus(userId, ApplicationStatus.OFFER);
        long offersAccepted = applicationRepository.countByUserIdAndStatus(userId, ApplicationStatus.ACCEPTED);

        double successRate = total == 0 ? 0.0 : (offersAccepted * 100.0) / total;

        return new DashboardSummaryResponse(total, active, interviews, offersReceived, offersAccepted,
                Math.round(successRate * 10) / 10.0);
    }

    private final ApplicationEventRepository applicationEventRepository;

    public ConversionFunnelResponse getConversionFunnel() {
        Long userId = authUtil.getCurrentUserId();

        long applied = applicationRepository.countByUserId(userId);
        long received = applicationEventRepository.countApplicationsThatReachedStatus(userId, ApplicationStatus.RECEIVED);
        long assessment = applicationEventRepository.countApplicationsThatReachedStatus(userId, ApplicationStatus.ASSESSMENT);
        long interview = applicationEventRepository.countApplicationsThatReachedStatus(userId, ApplicationStatus.INTERVIEW);
        long offer = applicationEventRepository.countApplicationsThatReachedStatus(userId, ApplicationStatus.OFFER);
        long accepted = applicationEventRepository.countApplicationsThatReachedStatus(userId, ApplicationStatus.ACCEPTED);

        return new ConversionFunnelResponse(applied, received, assessment, interview, offer, accepted);
    }

    public List<WeeklyApplicationsResponse> getWeeklyApplications() {
        Long userId = authUtil.getCurrentUserId();
        LocalDateTime sevenWeeksAgo = LocalDateTime.now().minusWeeks(7);

        List<Application> recentApplications = applicationRepository.findByUserIdSince(userId, sevenWeeksAgo);

        Map<Integer, Long> countsByWeeksAgo = new TreeMap<>();
        for (int i = 6; i >= 0; i--) {
            countsByWeeksAgo.put(i, 0L);
        }

        for (Application app : recentApplications) {
            long weeksAgo = ChronoUnit.WEEKS.between(app.getAppliedDate(), LocalDateTime.now());
            if (weeksAgo >= 0 && weeksAgo <= 6) {
                countsByWeeksAgo.merge((int) weeksAgo, 1L, Long::sum);
            }
        }

        List<WeeklyApplicationsResponse> result = new ArrayList<>();
        for (int weeksAgo = 6; weeksAgo >= 0; weeksAgo--) {
            String label = weeksAgo == 0 ? "This week" : weeksAgo + "w ago";
            result.add(new WeeklyApplicationsResponse(label, countsByWeeksAgo.get(weeksAgo)));
        }

        return result;
    }

    public List<RecentActivityResponse> getRecentActivity(int limit) {
        Long userId = authUtil.getCurrentUserId();

        List<ApplicationEvent> events = applicationEventRepository.findRecentEventsByUserId(
                userId, PageRequest.of(0, limit));

        List<RecentActivityResponse> result = new ArrayList<>();
        for (ApplicationEvent event : events) {
            Application app = applicationRepository.findById(event.getApplicationId()).orElse(null);
            if (app == null) continue; // shouldn't happen given cascade delete, but stay defensive

            result.add(new RecentActivityResponse(
                    app.getId(),
                    app.getCompany(),
                    app.getJobTitle(),
                    event.getOldStatus(),
                    event.getNewStatus(),
                    event.getSource(),
                    event.getCreatedAt()
            ));
        }

        return result;
    }
}