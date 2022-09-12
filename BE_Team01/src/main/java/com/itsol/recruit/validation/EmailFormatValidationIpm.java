package com.itsol.recruit.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class EmailFormatValidationIpm implements ConstraintValidator<EmailFormatValidation, String> {

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if(value.matches("^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$")){
            return true;
        }
        return false;
    }
}
