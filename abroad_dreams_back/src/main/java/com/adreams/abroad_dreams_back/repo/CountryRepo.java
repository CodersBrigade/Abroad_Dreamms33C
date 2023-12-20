package com.adreams.abroad_dreams_back.repo;

import com.adreams.abroad_dreams_back.entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CountryRepo extends JpaRepository<Country, Long> {
}
