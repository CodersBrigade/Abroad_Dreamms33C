package com.adreams.abroad_dreams_back.service;

import com.adreams.abroad_dreams_back.entity.Country;
import com.adreams.abroad_dreams_back.pojo.CountryPojo;

import java.util.List;
import java.util.Optional;

public interface CountryService {

    String save(CountryPojo countryPojo);

    List<Country> getAll();

    void deleteById(Long id);

    Optional<Country> getById(Long id);

    String update(Long id, CountryPojo countryPojo);

    // Other custom service methods, if any
}
