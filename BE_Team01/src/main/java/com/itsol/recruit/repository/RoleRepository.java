package com.itsol.recruit.repository;

import com.itsol.recruit.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Set<Role> findByCode(String code);


}
