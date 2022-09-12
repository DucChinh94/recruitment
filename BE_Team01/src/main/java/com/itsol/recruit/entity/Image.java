package com.itsol.recruit.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "image")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Image {
    @Id
    @Column(nullable = false)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "IMAGE_SEQ")
    @SequenceGenerator(name = "IMAGE_SEQ", sequenceName = "IMAGE_SEQ", allocationSize = 1, initialValue = 1)
    private Long id;

    private Long userId;

    @Column(name = "name")
    private String name;

    @Column(name = "type")
    private String type;

    @Column(name = "image", unique = false, nullable = false, length = 100000)
    private byte[] image;
}
