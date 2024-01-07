package com.adreams.abroad_dreams_back.repo;

import com.adreams.abroad_dreams_back.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApplicationRepo extends JpaRepository<Application, Long> {
}
