package com.itsol.recruit.repository;

import com.itsol.recruit.core.Constants;
import com.itsol.recruit.entity.Job;
import com.itsol.recruit.entity.StatusJob;

import com.itsol.recruit.entity.StatusJobRegister;
import jdk.net.SocketFlow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StatusJobRegisterRepository extends JpaRepository<StatusJobRegister, Long> {
    StatusJobRegister findStatusById(Long id);

}
