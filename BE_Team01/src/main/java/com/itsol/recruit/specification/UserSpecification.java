package com.itsol.recruit.specification;

import com.itsol.recruit.entity.User;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

public class UserSpecification {
    public static Specification<User> buildWhere(String search){
        Specification<User> where = null;

        if (!StringUtils.isEmpty(search)) {
            search = search.trim();
            CustomSpecification userName = new CustomSpecification("userName", search);
            CustomSpecification email = new CustomSpecification("email", search);
            CustomSpecification phoneNumber = new CustomSpecification("phoneNumber", search);

            where = Specification.where(userName).or(email).or(phoneNumber);
        }

        return where;
    }
}
