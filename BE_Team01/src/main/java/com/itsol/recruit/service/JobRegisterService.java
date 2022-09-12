package com.itsol.recruit.service;

import com.itsol.recruit.dto.BookInterviewDto;
import com.itsol.recruit.dto.JobRegisterDTO;
import com.itsol.recruit.dto.StatusJobRegisterDTO;
import com.itsol.recruit.entity.JobRegister;
import com.itsol.recruit.filter.JobRgfilter;
import com.itsol.recruit.web.vm.PageVM;
import org.springframework.data.domain.Page;

import java.text.ParseException;
import java.util.Optional;

public interface JobRegisterService {
    Page<JobRegisterDTO> getAllJobRegister(PageVM pageVM, String search, String sortBy, JobRgfilter jobRgfilter);
    Optional<JobRegister> findById(Long id);
    JobRegister addJobRegister(JobRegisterDTO dto);
    void deleteById(Long id);
    JobRegister updateById(JobRegisterDTO jobRegisterDTO);

    JobRegister updateStatusJobRegister(StatusJobRegisterDTO statusJobRegisterDTO);
    JobRegisterDTO save(JobRegisterDTO jobRegisterDTO);

    /*
     * trungnd
     */
    int countAll();

    int countJobRegByStatus(Long statusId,String smallDate, String bigDate);

    int countSuccessfullJobReg(int param);

    JobRegister bookInterView(BookInterviewDto dto) throws ParseException;

}
