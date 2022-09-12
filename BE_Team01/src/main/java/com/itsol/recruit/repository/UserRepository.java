package com.itsol.recruit.repository;

import com.itsol.recruit.entity.User;
import com.itsol.recruit.repository.repoext.UserRepositoryExt;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<User, Long>, UserRepositoryExt, JpaSpecificationExecutor<User> {


    User findByUserName(String userName);

    User findUserById(Long id);
    User findUserByEmail(String email);
    User findUserByPhoneNumber(String phone);
    Optional<User> findByEmail(String username);

//    @Modifying
//    @Query(value = "select users from users  join permisstion  on users.id = permisstion.user_id where permisstion.role_id = 2 ", nativeQuery = true)
    Page<User> findAll(Specification<User> where, Pageable pageable);

}
