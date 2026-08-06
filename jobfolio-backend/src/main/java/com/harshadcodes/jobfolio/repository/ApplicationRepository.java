package com.harshadcodes.jobfolio.repository;

import com.harshadcodes.jobfolio.entity.Application;
import com.harshadcodes.jobfolio.entity.ApplicationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByUserId(Long userId);

    Optional<Application> findByIdAndUserId(Long id, Long userId);

    List<Application> findByUserIdAndJobUrlAndStatusNotIn(Long userId, String jobUrl, List<ApplicationStatus> accepted);
}