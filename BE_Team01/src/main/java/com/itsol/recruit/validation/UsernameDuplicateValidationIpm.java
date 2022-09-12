package com.itsol.recruit.validation;

import com.itsol.recruit.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class UsernameDuplicateValidationIpm implements ConstraintValidator<UsernameDuplicateValidation, String> {


    @Autowired
    private UserService userService;
    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return !userService.isExistedUser(value);
    }
}
