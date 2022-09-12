package com.itsol.recruit.service;

import com.itsol.recruit.dto.JobDTO;

import com.itsol.recruit.dto.ReasonDTO;
import com.itsol.recruit.dto.StatusJobDTO;
import com.itsol.recruit.entity.*;
import com.itsol.recruit.filter.JobFilter;
import com.itsol.recruit.web.vm.JobFieldVM;
import com.itsol.recruit.web.vm.PageVM;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface JobService {

    List<Job> getAllJob();

    Optional<Job> findById(Long id);

    Job addJob(JobDTO jobDTO);

    void deleteById(Long id);

    /*
    *chinhnd
     */

    int countJobPublished();

    int countAllJobDueSoon();

    int countViewjob();

    int countJobNeedManStepMonth(int month);

    Job updateById(JobDTO jobDTO);

    Job updateStatus(StatusJobDTO statusJobDTO);

    Job updateReason(ReasonDTO reasonDTO);

    Job findJobByName(String jobName);

    JobFieldVM getFieldSelect();

    Page<JobDTO> getAllJobs(PageVM pageVM, String search, String sortBy);

    void updateViewBy(Long id);

    List<AcademicLevel> getAllAcademiclevel();
    List<JobPosition> getAllJobPosition();
    List<Rank> getAllRank();
    List<StatusJob> getAllAStatusJobs();
    List<WorkingForm> getAllWorkingform();

    Page<JobDTO> getAllJob(PageVM pageVM, String search, String sortBy, JobFilter jobFilter);
}
