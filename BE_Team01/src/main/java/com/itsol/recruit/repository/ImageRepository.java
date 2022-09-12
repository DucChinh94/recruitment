package com.itsol.recruit.repository;

import com.itsol.recruit.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Long> {

    Image findByUserId(Long id);
}
