package com.adreams.abroad_dreams_back.repo;

import com.adreams.abroad_dreams_back.entity.Instructor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InstructorRepo extends JpaRepository<Instructor, Long> {

    List<Instructor> findByName(String name);

    // Additional custom queries, if any

}
