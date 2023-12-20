package com.adreams.abroad_dreams_back.service.impl;

import com.adreams.abroad_dreams_back.entity.Country;
import com.adreams.abroad_dreams_back.pojo.CountryPojo;
import com.adreams.abroad_dreams_back.repo.CountryRepo;

import com.adreams.abroad_dreams_back.service.CountryService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CountryServiceImpl implements CountryService {

    private final CountryRepo countryRepo;

    @Override
    public String save(CountryPojo countryPojo) {
        Country country;

        if (countryPojo.getCountryId() != null) {
            country = countryRepo.findById(countryPojo.getCountryId())
                    .orElseThrow(() -> new EntityNotFoundException("Country not found with ID: " + countryPojo.getCountryId()));
        } else {
            country = new Country();
        }

        // Set values from CountryPojo to Country entity
        country.setCountryName(countryPojo.getCountryName());
        country.setCountryShortname(countryPojo.getCountryShortname());

        countryRepo.save(country);
        return "Saved Successfully!";
    }

    @Override
    public List<Country> getAll() {
        return countryRepo.findAll();
    }

    @Override
    public void deleteById(Long id) {
        countryRepo.deleteById(id);
    }

    @Override
    public Optional<Country> getById(Long id) {
        return countryRepo.findById(id);
    }

    @Override
    public String update(Long id, CountryPojo countryPojo) {
        Country country = countryRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Country not found with ID: " + id));

        // Set values from CountryPojo to Country entity for update
        country.setCountryName(countryPojo.getCountryName());
        country.setCountryShortname(countryPojo.getCountryShortname());

        countryRepo.save(country);
        return "Updated Successfully!";
    }

    // Other custom service methods, if any
}
