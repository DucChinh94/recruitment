package com.itsol.recruit.entity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;

@Entity(name = "Type")
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Type {
    @Id
    @Column(nullable = false)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "TYPE_SEQ")
    @SequenceGenerator(name = "TYPE_SEQ", sequenceName = "TYPE_SEQ", allocationSize = 1, initialValue = 1)
    Long id;

    @Column(name = "code")
    private String code;

    @Column(name = "description")
    private String description;

    @Column(name = "is_delete ")
    @org.hibernate.annotations.Type(type = "org.hibernate.type.NumericBooleanType")
    private boolean isDelete ;
}
