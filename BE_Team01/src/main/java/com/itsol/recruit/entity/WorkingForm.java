package com.itsol.recruit.entity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.Type;

import javax.persistence.*;

@Entity(name = "working_form")
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class WorkingForm {
    @Id
    @Column(nullable = false)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "WORK_SEQ")
    @SequenceGenerator(name = "WORK_SEQ", sequenceName = "WORK_SEQ", allocationSize = 1, initialValue = 1)
    Long id;

    @Column(name = "code")
    String code;

    @Column(name="description")
    String description;

    @Column(name = "is_delete ")
    @Type(type = "org.hibernate.type.NumericBooleanType")
    private boolean isDelete ;
}