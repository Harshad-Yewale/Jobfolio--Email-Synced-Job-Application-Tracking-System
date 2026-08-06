package com.harshadcodes.jobfolio.repository;

import com.harshadcodes.jobfolio.entity.ApplicationEvent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationEventRepository extends JpaRepository<ApplicationEvent, Long> {
    List<ApplicationEvent> findByApplicationIdOrderByCreatedAtAsc(Long applicationId);
}