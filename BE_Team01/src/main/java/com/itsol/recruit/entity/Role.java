package com.itsol.recruit.entity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.Type;

import javax.persistence.*;

@Entity(name = "roles")
@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "GEN_ROLE_ID")
    @SequenceGenerator(name = "GEN_ROLE_ID", sequenceName = "SEQ_ROLE", allocationSize = 1)
    @Column(name = "id", nullable = false)
    Long id;

    @Column(name = "code", nullable = false)
    String code;

    @Column(name = "description")
    String description;

    @Column(name = "is_delete")
    @Type(type = "org.hibernate.type.NumericBooleanType")
    boolean isDelete;
}
