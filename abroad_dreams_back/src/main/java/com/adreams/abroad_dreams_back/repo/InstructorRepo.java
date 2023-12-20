package com.adreams.abroad_dreams_back.repo;

import com.adreams.abroad_dreams_back.entity.Instructor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InstructorRepo extends JpaRepository<Instructor, Long> {
}
