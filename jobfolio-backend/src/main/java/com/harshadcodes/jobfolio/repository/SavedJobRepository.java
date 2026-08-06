package com.harshadcodes.jobfolio.repository;

import com.harshadcodes.jobfolio.entity.SavedJob;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SavedJobRepository extends JpaRepository<SavedJob, Long> {
    List<SavedJob> findByUserId(Long userId);
}