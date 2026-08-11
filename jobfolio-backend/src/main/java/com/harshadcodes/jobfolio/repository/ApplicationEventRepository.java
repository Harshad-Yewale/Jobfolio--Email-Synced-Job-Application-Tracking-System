package com.harshadcodes.jobfolio.repository;

import com.harshadcodes.jobfolio.entity.ApplicationEvent;
import com.harshadcodes.jobfolio.entity.ApplicationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ApplicationEventRepository extends JpaRepository<ApplicationEvent, Long> {
    List<ApplicationEvent> findByApplicationIdOrderByCreatedAtAsc(Long applicationId);

    @Query("SELECT COUNT(DISTINCT e.applicationId) FROM ApplicationEvent e " +
            "JOIN Application a ON a.id = e.applicationId " +
            "WHERE a.userId = :userId AND e.newStatus = :status")
    long countApplicationsThatReachedStatus(Long userId, ApplicationStatus status);
}