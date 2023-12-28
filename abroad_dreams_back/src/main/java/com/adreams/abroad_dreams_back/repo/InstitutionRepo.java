package com.adreams.abroad_dreams_back.repo;

import com.adreams.abroad_dreams_back.entity.Institution;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InstitutionRepo extends JpaRepository<Institution, Long> {

    List<Institution> findByInstitutionName(String institutionName);

    List<Institution> findByCountry(String country);

    List<Institution> findByCountryContaining(String country);

}
