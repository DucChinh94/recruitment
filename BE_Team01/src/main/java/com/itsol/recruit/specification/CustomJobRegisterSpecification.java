package com.itsol.recruit.specification;

import com.itsol.recruit.entity.JobRegister;
import com.itsol.recruit.entity.StatusJobRegister;
import com.itsol.recruit.entity.User;
import com.itsol.recruit.repository.JobRegisterRepository;
import com.itsol.recruit.repository.UserRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.*;
import java.util.Date;

@RequiredArgsConstructor
public class CustomJobRegisterSpecification implements Specification<JobRegister> {
    @NonNull
    private String field;

    @NonNull
    private Object value;

    @Autowired
    UserRepository userRepository;

    @Autowired
    JobRegisterRepository registerRepository;

    @Override
    public Predicate toPredicate(Root<JobRegister> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        Join<User, JobRegister> userJobRegisterJoin = root.join("user");
        Join<StatusJobRegister, JobRegister> statusJobRegisterJoin = root.join("statusJobRegister");
        if (field.equalsIgnoreCase("name")) {
            return criteriaBuilder.like(userJobRegisterJoin.get("name"), "%" + value.toString() + "%");
        }else if (field.equalsIgnoreCase("minDate")) {
            Expression es = root.<Date>get("dateRegister");
            return criteriaBuilder.greaterThanOrEqualTo(es, (Date)value);
        }else if (field.equalsIgnoreCase("maxDate")) {
            Expression es = root.<Date>get("dateRegister");
            return criteriaBuilder.lessThanOrEqualTo(es, (Date)value);
        }else if (field.equalsIgnoreCase("status")) {
            return criteriaBuilder.equal(statusJobRegisterJoin.get("description"), value);
        }
        return null;
    }
}
