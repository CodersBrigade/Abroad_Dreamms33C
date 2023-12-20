package com.adreams.abroad_dreams_back.controller;

import com.adreams.abroad_dreams_back.entity.Country;
import com.adreams.abroad_dreams_back.service.CountryService;
import com.adreams.abroad_dreams_back.pojo.CountryPojo;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/country")
@RequiredArgsConstructor
public class CountryController {

    private final CountryService countryService;

    @PostMapping(value = "/save")
    public String saveCountry(@Valid @RequestBody CountryPojo countryPojo) {
        countryService.save(countryPojo);
        return "Saved Successfully!";
    }

    @GetMapping("/getAll")
    public List<Country> getAll() {
        return this.countryService.getAll();
    }

    @GetMapping("/getById/{id}")
    public Optional<Country> getById(@PathVariable("id") Long id) {
        return this.countryService.getById(id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteById(@PathVariable("id") Long id) {
        this.countryService.deleteById(id);
    }

    @PutMapping("/update/{id}")
    public String updateCountry(@PathVariable("id") Long id, @Valid @RequestBody CountryPojo countryPojo) {
        return this.countryService.update(id, countryPojo);
    }
}
