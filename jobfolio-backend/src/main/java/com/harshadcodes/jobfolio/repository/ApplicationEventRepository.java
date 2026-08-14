package com.harshadcodes.jobfolio.repository;

import com.harshadcodes.jobfolio.entity.ApplicationEvent;
import com.harshadcodes.jobfolio.entity.ApplicationStatus;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ApplicationEventRepository extends JpaRepository<ApplicationEvent, Long> {
    List<ApplicationEvent> findByApplicationIdOrderByCreatedAtAsc(Long applicationId);

    @Query("SELECT COUNT(DISTINCT e.applicationId) FROM ApplicationEvent e " +
            "JOIN Application a ON a.id = e.applicationId " +
            "WHERE a.userId = :userId AND e.newStatus = :status")
    long countApplicationsThatReachedStatus(Long userId, ApplicationStatus status);

    @Query("SELECT e FROM ApplicationEvent e " +
            "JOIN Application a ON a.id = e.applicationId " +
            "WHERE a.userId = :userId " +
            "ORDER BY e.createdAt DESC")
    List<ApplicationEvent> findRecentEventsByUserId(Long userId, Pageable pageable);
}