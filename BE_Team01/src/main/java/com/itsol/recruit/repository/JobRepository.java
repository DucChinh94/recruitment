package com.itsol.recruit.repository;

import com.itsol.recruit.entity.Job;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JobRepository extends JpaRepository<Job, Long>, JpaSpecificationExecutor<Job> {

    @Query("SELECT jobs FROM job jobs  ORDER BY jobs.dueDate ASC")
    List<Job> findAllOrderByDateAsc();

    Optional<Job> findById(Long id);

    Job findJobByName(String jobName);

//    void deleteById(Long id);

    @Query(value = "select count(*)  from job b", nativeQuery = true)
    int countJobPublished();

    @Query(value = "select count(*) from job j \n" +
            "where (select extract(day from sysdate) \n" +
            "- EXTRACT(day from j.due_date) from dual) <= 7", nativeQuery = true)
    int countAllJobDueSoon();

    @Query(value = "select SUM(j.views) from job j", nativeQuery = true)
    int countViewJob();

    @Query(value = "select sum(qty_person) from job " +
            "where job.status_id = 5 " +
            "and extract(month from job.START_RECRUITMENT_DATE) = :param", nativeQuery = true)
    int countJobNeedManStepMonth(int param);

}
