package com.harshadcodes.jobfolio.repository;

import com.harshadcodes.jobfolio.entity.Application;
import com.harshadcodes.jobfolio.entity.ApplicationEvent;
import com.harshadcodes.jobfolio.entity.ApplicationStatus;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByUserId(Long userId);

    Optional<Application> findByIdAndUserId(Long id, Long userId);

    List<Application> findByUserIdAndJobUrlAndStatusNotIn(Long userId, String jobUrl, List<ApplicationStatus> accepted);

    List<Application> findByUserIdAndStatusNotIn(Long userId, List<ApplicationStatus> statuses);

    long countByUserId(Long userId);
    long countByUserIdAndStatus(Long userId, ApplicationStatus status);
    long countByUserIdAndStatusNotIn(Long userId, List<ApplicationStatus> statuses);

    @Query("SELECT a FROM Application a WHERE a.userId = :userId AND a.appliedDate >= :since")
    List<Application> findByUserIdSince(Long userId, LocalDateTime since);


}