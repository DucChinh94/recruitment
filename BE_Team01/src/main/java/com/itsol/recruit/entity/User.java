package com.itsol.recruit.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.Type;
import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity(name = "Users")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class User{
    @Id
    @Column(nullable = false)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "USERS_SEQ")
    @SequenceGenerator(name = "USERS_SEQ", sequenceName = "USERS_SEQ", allocationSize = 1, initialValue = 7)
    Long id;

    @Column(name = "name")
    String name;

    @Column(name = "email")
    String email;

    @Column(name = "user_name")
    String userName;

    @Column(name = "password")
    String password;

    @Column(name = "phone_number")
    String phoneNumber;

    @Column(name = "home_town")
    String homeTown;

    @Column(name = "avatar")
    String avatarName;

    @Column(name = "gender")
    String gender;

    @Column(name = "birth_day")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    Date birthDay;

    @Column(name = "is_delete")
    @Type(type = "org.hibernate.type.NumericBooleanType")
    boolean isDelete;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "permisstion",
            joinColumns = @JoinColumn(name = "USER_ID"),
            inverseJoinColumns = @JoinColumn(name = "ROLE_ID")
    )
    private Set<Role> roles = new HashSet<>();

    @Column(name = "activate")
    @Type(type = "org.hibernate.type.NumericBooleanType")
    private boolean isActive;

}