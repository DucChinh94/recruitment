package com.itsol.recruit.repository;

import com.itsol.recruit.entity.WorkingForm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkingFormRepository extends JpaRepository<WorkingForm, Long> {
}
