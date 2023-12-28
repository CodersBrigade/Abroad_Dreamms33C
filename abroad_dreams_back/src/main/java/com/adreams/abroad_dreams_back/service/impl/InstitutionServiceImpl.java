package com.adreams.abroad_dreams_back.service.impl;

import com.adreams.abroad_dreams_back.entity.Institution;
import com.adreams.abroad_dreams_back.pojo.InstitutionPojo;
import com.adreams.abroad_dreams_back.repo.InstitutionRepo;
import com.adreams.abroad_dreams_back.service.InstitutionService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class InstitutionServiceImpl implements InstitutionService {

    private final InstitutionRepo institutionRepo;

    @Override
    public String save(InstitutionPojo institutionPojo) {
        Institution institution;

        if (institutionPojo.getInstitutionId() != null) {
            institution = institutionRepo.findById(institutionPojo.getInstitutionId())
                    .orElseThrow(() -> new EntityNotFoundException("Institution not found with ID: " + institutionPojo.getInstitutionId()));
        } else {
            institution = new Institution();
        }

        // Set values from InstitutionPojo to Institution entity
        institution.setInstitutionName(institutionPojo.getInstitutionName());
        institution.setAddress(institutionPojo.getAddress());
        institution.setOfficialWebsite(institutionPojo.getOfficialWebsite());
        institution.setCountry(institutionPojo.getCountry());
        institution.setDescription(institutionPojo.getDescription());
        institution.setCoursesTypes(institutionPojo.getCoursesTypes());
        institution.setSpecialInformation(institutionPojo.getSpecialInformation());
        institution.setRulesAndRegulation(institutionPojo.getRulesAndRegulation());


        institutionRepo.save(institution);
        return "Saved Successfully!";
    }

    @Override
    public List<Institution> getAll() {
        return institutionRepo.findAll();
    }

    @Override
    public void deleteById(Long id) {
        institutionRepo.deleteById(id);
    }

    @Override
    public Optional<Institution> getById(Long id) {
        return institutionRepo.findById(id);
    }

    @Override
    public List<Institution> getByInstitutionName(String institutionName) {
        return institutionRepo.findByInstitutionName(institutionName);
    }

    @Override
    public List<Institution> getByCountry(String country) {
        return institutionRepo.findByCountry(country);
    }

    @Override
    public List<Institution> getByCountryContaining(String country) {
        return institutionRepo.findByCountryContaining(country);
    }

    @Override
    public String update(Long id, InstitutionPojo institutionPojo) {
        Institution existingInstitution = institutionRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Institution not found with ID: " + id));

        // Set values from InstitutionPojo to existing Institution entity
        existingInstitution.setInstitutionName(institutionPojo.getInstitutionName());
        existingInstitution.setAddress(institutionPojo.getAddress());
        existingInstitution.setOfficialWebsite(institutionPojo.getOfficialWebsite());
        existingInstitution.setCountry(institutionPojo.getCountry());
        existingInstitution.setDescription(institutionPojo.getDescription());
        existingInstitution.setCoursesTypes(institutionPojo.getCoursesTypes());
        existingInstitution.setSpecialInformation(institutionPojo.getSpecialInformation());
        existingInstitution.setRulesAndRegulation(institutionPojo.getRulesAndRegulation());

        institutionRepo.save(existingInstitution);
        return "Updated Successfully!";
    }


    // Other custom service methods, if any
}
