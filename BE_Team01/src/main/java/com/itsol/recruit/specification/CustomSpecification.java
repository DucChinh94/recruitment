package com.itsol.recruit.specification;

import com.itsol.recruit.entity.User;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

@SuppressWarnings("serial")
@RequiredArgsConstructor
public class CustomSpecification  implements Specification<User> {

    @NonNull
    private String field;

    @NonNull
    private Object value;
    @Override
    public Predicate toPredicate(Root<User> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        if (field.equalsIgnoreCase("userName")) {
            return criteriaBuilder.like(root.get("userName"), "%" + value.toString() + "%");
        }else if (field.equalsIgnoreCase("email")) {
            return criteriaBuilder.like(root.get("email"), "%" + value.toString() + "%");
        }else if (field.equalsIgnoreCase("phoneNumber")) {
            return criteriaBuilder.like(root.get("phoneNumber"), "%" + value.toString() + "%");
        }
        return null;
    }
}
