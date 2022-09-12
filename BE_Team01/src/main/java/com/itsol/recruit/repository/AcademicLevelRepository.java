package com.itsol.recruit.repository;

import com.itsol.recruit.entity.AcademicLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AcademicLevelRepository extends JpaRepository<AcademicLevel, Long> {
}
