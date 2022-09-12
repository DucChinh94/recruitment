package com.itsol.recruit.service.mapper;

import com.itsol.recruit.core.Constants;
import com.itsol.recruit.dto.JobRegisterDTO;
import com.itsol.recruit.entity.*;
import com.itsol.recruit.repository.JobRepository;
import com.itsol.recruit.repository.StatusJobRegisterRepository;
import com.itsol.recruit.repository.StatusJobRegisterRepository;
import com.itsol.recruit.repository.UserRepository;
import com.itsol.recruit.service.impl.JobServiceImpl;
import com.itsol.recruit.web.JobController;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class JobRegisterMapper implements EntityMapper<JobRegisterDTO, JobRegister>{

    @Autowired
    UserRepository userRepository;

    @Autowired
    StatusJobRegisterRepository statusJobRegister;
    @Autowired
    JobRepository jobRepository;

    @Override
    public JobRegister toEntity(JobRegisterDTO dto) {
        if(dto == null){
            return null;
        }
        JobRegister entity = new JobRegister();
        BeanUtils.copyProperties(dto, entity);
        entity.setUser(userRepository.getById(dto.getUser().getId()));
        entity.setJob(jobRepository.getById(dto.getStatusJobRegister().getId()));
        entity.setStatusJobRegister(statusJobRegister.findById(dto.getStatusJobRegister().getId()).get());
        entity.setReason(jobRepository.getById(dto.getId()).getReason());
        return entity;
    }

    @Override
    public JobRegisterDTO toDto(JobRegister entity) {
        if(entity == null){
            return null;
        }
        JobRegisterDTO dto = new JobRegisterDTO();
        BeanUtils.copyProperties(entity, dto);
        return dto;
    }

    @Override
    public List<JobRegister> toEntity(List<JobRegisterDTO> dtoList) {
        return dtoList.stream().map(this::toEntity).collect(Collectors.toList());
    }

    @Override
    public List<JobRegisterDTO> toDto(List<JobRegister> entityList) {
        return entityList.stream().map(this::toDto).collect(Collectors.toList());
    }

}
