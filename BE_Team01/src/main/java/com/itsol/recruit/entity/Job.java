package com.itsol.recruit.entity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity(name = "job")
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Job implements Serializable {
    @Id
    @Column(nullable = false)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "JOBS_SEQ")
    @SequenceGenerator(name = "JOBS_SEQ", sequenceName = "JOBS_SEQ", allocationSize = 1, initialValue = 6)
    Long id;

    @Column(name = "name")
    String name;

    @ManyToOne
    @JoinColumn(name = "job_position_id")
    JobPosition jobPosition;

    @Column(name = "number_experience")
    Integer numberExperience;

    @ManyToOne
    @JoinColumn(name = "working_form_id")
    WorkingForm workingForm;

    @Column(name = "address_work")
    String addressWork;

    @ManyToOne
    @JoinColumn(name = "academic_level_id")
    AcademicLevel academicLevel ;

    @ManyToOne
    @JoinColumn(name = "rank_id")
    Rank rank ;

    @Column(name = "qty_person")
    Integer qtyPerson;

    @Column(name = "start_recruitment_date")
    Date startRecruitmentDate ;

    @Column(name = "due_date")
    Date dueDate;

    @Column(name = "skills")
    String skills;

    @Column(name = "description")
    String description;
    

    @Column(name = "interrest")
    String interrest;

    @Column(name = "job_requirement")
    String jobRequirement;

    @Column(name = "salary_max")
    Integer salaryMax;

    @Column(name = "salary_min")
    Integer salaryMin;

    @Column(name = "reason")
    String reason;

    @ManyToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "contact_id")
    User contact;

    @ManyToOne
    @JoinColumn(name = "create_id")
    User creater;

    @Column(name = "create_date")
    Date createDate ;

    @ManyToOne
    @JoinColumn(name = "update_id")
    User updateUser;

    @Column(name = "update_date")
    Date updateDate ;

    @ManyToOne
    @JoinColumn(name = "status_id")
    StatusJob statusJob;

    @Column(name = "views")
    Integer views;

    @Column(name = "isDelete ")
    @Type(type = "org.hibernate.type.NumericBooleanType")
    boolean isDelete ;


}

