package com.itsol.recruit.repository;

import com.itsol.recruit.entity.StatusJob;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StatusJobRepository extends JpaRepository<StatusJob, Long> {
    StatusJob findStatusById(Long id);
}
