package com.itsol.recruit.repository;

import com.itsol.recruit.entity.JobPosition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobPositionRepository extends JpaRepository<JobPosition, Long> {
}
