package com.adreams.abroad_dreams_back.repo;

import com.adreams.abroad_dreams_back.entity.Application;
import com.adreams.abroad_dreams_back.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ApplicationRepo extends JpaRepository<Application, Long> {

    @Query("SELECT c FROM Course c WHERE c.courseId NOT IN :courseIds")
    List<Course> findCoursesNotInIds(@Param("courseIds") List<Long> courseIds);

    @Query("SELECT a FROM Application a WHERE a.userId = :userId")
    List<Application> findByUserId(@Param("userId") Long userId);

}
