package com.itsol.recruit.entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class StatusJobRegister implements Serializable {
    @Id
    @Column(nullable = false)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "PROFILES_SEQ")
    @SequenceGenerator(name = "PROFILES_SEQ", sequenceName = "PROFILES_SEQ", allocationSize = 1, initialValue = 1)
    Long id;

    @Column(name = "code", nullable = false)
    private String code;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "is_delete", nullable = false)
    @Type(type = "org.hibernate.type.NumericBooleanType")
    private Boolean isDelete;
}
