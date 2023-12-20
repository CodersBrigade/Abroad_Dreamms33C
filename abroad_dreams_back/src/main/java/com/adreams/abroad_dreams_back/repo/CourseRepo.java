package com.adreams.abroad_dreams_back.repo;

import com.adreams.abroad_dreams_back.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepo extends JpaRepository<Course, Long> {
}
