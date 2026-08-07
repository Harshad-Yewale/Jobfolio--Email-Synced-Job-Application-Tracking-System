package com.harshadcodes.jobfolio.repository;

import com.harshadcodes.jobfolio.entity.EmailConnection;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EmailConnectionRepository extends JpaRepository<EmailConnection, Long> {
    Optional<EmailConnection> findByUserId(Long userId);
    List<EmailConnection> findBySyncEnabledTrue();
}