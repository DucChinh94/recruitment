package com.itsol.recruit.repository;

import com.itsol.recruit.entity.OTP;
import com.itsol.recruit.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OTPRepository extends JpaRepository<OTP, Long> {
    OTP findByCode(String code);
    Optional<User> findOTPByUser(Long otp);

}
