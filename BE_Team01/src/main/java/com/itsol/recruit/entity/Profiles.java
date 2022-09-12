package com.itsol.recruit.entity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.io.Serializable;

@Entity(name = "profiles")
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)

public class Profiles implements Serializable {

    @Id
    @Column(nullable = false)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "PROFILES_SEQ")
    @SequenceGenerator(name = "PROFILES_SEQ", sequenceName = "PROFILES_SEQ", allocationSize = 1, initialValue = 1)
    Long id;

    @OneToOne
    @JoinColumn(name = "user_id", unique = true)
    private User user;

    @Column(name = "skill", nullable = false)
    private String Skill;

    @Column(name = "number_years_experience", nullable = false)
    private Integer numberYearsExperience;

    @OneToOne
    @JoinColumn(name ="academic_name_id")
    private AcademicLevel academicLevel;

    @Column(name = "desired_working_form", nullable = false)
    String desiredWorkingForm;

    @Column(name = "desired_salary", nullable = false)
    String desiredSalary;

    @Column(name = "desired_working_address", nullable = false)
    String desiredWorkingAddress;

    @Column(name = "is_delete ")
    @Type(type = "org.hibernate.type.NumericBooleanType")
    private boolean isDelete;

}
