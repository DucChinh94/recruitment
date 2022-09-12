package com.itsol.recruit.entity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.Date;

@Entity(name = "Notifications")
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)

public class Notifications {
    @Id
    @Column(nullable = false)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "NOTIFICATION_SEQ")
    @SequenceGenerator(name = "NOTIFICATION_SEQ", sequenceName = "NOTIFICATION_SEQ", allocationSize = 1, initialValue = 1)
    Long id;

    @ManyToOne
    @JoinColumn(name = "sender_id")
    private User sender;

    @ManyToOne
    @JoinColumn(name = "receiver_id")
    private User receiver;

    @Column(name = "create_date")
    private Date dateInterview;

    @Column(name = "content")
    private String content;

    @Column(name = "res_id")
    private Long res;

    @ManyToOne
    @JoinColumn(name= "type_id")
    private com.itsol.recruit.entity.Type type;

    @Column(name = "is_delete ")
    @Type(type = "org.hibernate.type.NumericBooleanType")
    private boolean isDelete ;

    public Notifications(String content,Date dateInterview,User user){
        this.content = content;
        this.dateInterview = dateInterview;
        this.receiver = user;
        this.isDelete = false;
    }
}
