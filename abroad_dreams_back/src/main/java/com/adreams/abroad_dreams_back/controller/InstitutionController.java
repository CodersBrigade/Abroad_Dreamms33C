package com.adreams.abroad_dreams_back.controller;

import com.adreams.abroad_dreams_back.entity.Institution;
import com.adreams.abroad_dreams_back.pojo.InstitutionPojo;
import com.adreams.abroad_dreams_back.service.InstitutionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/institution")
@RequiredArgsConstructor
public class InstitutionController {

    private final InstitutionService institutionService;

    @PostMapping(value = "/save")
    public String saveInstitution(@Valid @RequestBody InstitutionPojo institutionPojo) {
        institutionService.save(institutionPojo);
        return "Saved Successfully!";
    }

    @GetMapping("/getAll")
    public List<Institution> getAll() {
        return this.institutionService.getAll();
    }

    @GetMapping("/getById/{id}")
    public Optional<Institution> getById(@PathVariable("id") Long id) {
        return this.institutionService.getById(id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteById(@PathVariable("id") Long id) {
        this.institutionService.deleteById(id);
    }

    @PutMapping("/update/{id}")
    public String update(@PathVariable("id") Long id, @Valid @RequestBody InstitutionPojo institutionPojo) {
        return this.institutionService.update(id, institutionPojo);
    }

    @GetMapping("/getByInstitutionName/{name}")
    public List<Institution> getByInstitutionName(@PathVariable("name") String name) {
        return this.institutionService.getByInstitutionName(name);
    }

    @GetMapping("/getByCountry/{country}")
    public List<Institution> getByCountry(@PathVariable("country") String country) {
        return this.institutionService.getByCountryContaining(country);
    }


}
