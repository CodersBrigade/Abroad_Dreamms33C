package com.adreams.abroad_dreams_back.repo;

import com.adreams.abroad_dreams_back.entity.StudentProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentProfileRepo extends JpaRepository<StudentProfile, Long> {
    List<StudentProfile> findBySystemUserId(Long userId);

}
