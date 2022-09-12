package com.itsol.recruit.entity;


import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.Type;

import javax.persistence.*;
@Entity(name = "status_job")
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)

public class StatusJob {
    @Id
    @Column(nullable = false)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "JOB_STATUS_SEQ")
    @SequenceGenerator(name = "JOB_STATUS_SEQ", sequenceName = "JOB_STATUS_SEQ", allocationSize = 1, initialValue = 1)
    Long id;

    @Column(name = "code")
    String name;

    @Column(name = "description")
    String description;

    @Column(name = "is_delete ")
    @Type(type = "org.hibernate.type.NumericBooleanType")
    private boolean isDelete ;
}
