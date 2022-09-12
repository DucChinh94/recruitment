package com.itsol.recruit.entity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.Type;

import javax.persistence.*;

@Entity(name = "rank")
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Rank {
    @Id
    @Column(nullable = false)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "RANK_SEQ")
    @SequenceGenerator(name = "RANK_SEQ", sequenceName = "RANK_SEQ", allocationSize = 1, initialValue = 1)
    Long id;

    @Column(name = "code")
    String code;

    @Column(name = "description")
    String description;

    @Column(name = "is_delete ")
    @Type(type = "org.hibernate.type.NumericBooleanType")
    private boolean isDelete ;
}
