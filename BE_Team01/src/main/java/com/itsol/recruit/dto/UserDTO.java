package com.itsol.recruit.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.itsol.recruit.validation.EmailDuplicateValidation;
import com.itsol.recruit.validation.EmailFormatValidation;
import com.itsol.recruit.validation.PasswordlFormatValidation;
import com.itsol.recruit.validation.UsernameDuplicateValidation;
import lombok.Data;
import org.hibernate.validator.constraints.UniqueElements;

import javax.persistence.Column;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Data
public class UserDTO {


    String fullName;

    @NotNull
    @EmailFormatValidation
    String email;

    @NotNull
    String userName;

    @NotNull
    @PasswordlFormatValidation
    String password;

    String phoneNumber;

    String homeTown;

    String avatarName;

    String gender;

    @NotNull
    @PasswordlFormatValidation
    String newPassword;

    String name;

    boolean isActive;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    Date birthDay;
}
