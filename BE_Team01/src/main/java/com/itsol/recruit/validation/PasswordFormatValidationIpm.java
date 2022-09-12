package com.itsol.recruit.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class PasswordFormatValidationIpm implements ConstraintValidator<PasswordlFormatValidation, String> {

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if(value.matches("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$")){
            return true;
        }
        return false;
    }
}
