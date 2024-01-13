package com.adreams.abroad_dreams_back.service.impl;

import com.adreams.abroad_dreams_back.config.PasswordEncoderUtil;
import com.adreams.abroad_dreams_back.entity.SystemUser;
import com.adreams.abroad_dreams_back.pojo.SystemUserPojo;
import com.adreams.abroad_dreams_back.repo.SystemUserRepo;
import com.adreams.abroad_dreams_back.service.SystemUserService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SystemUserServiceImpl implements SystemUserService {

    private final SystemUserRepo systemUserRepo;


    @Override
    public String save(SystemUserPojo systemUserPojo) {
        SystemUser systemUser;

        try {

        if (systemUserPojo.getUserId() != null) {
            systemUser = systemUserRepo.findById(systemUserPojo.getUserId())
                    .orElseThrow(() -> new EntityNotFoundException("SystemUser not found with ID: " + systemUserPojo.getUserId()));
        } else {
            systemUser = new SystemUser();
        }

        // Set values from SystemUserPojo to SystemUser entity
        systemUser.setUsername(systemUserPojo.getUsername());
        systemUser.setRole("Student");
        systemUser.setEmail(systemUserPojo.getEmail());

        systemUser.setPassword(PasswordEncoderUtil.getInstance().encode(systemUserPojo.getPassword()));

        systemUserRepo.save(systemUser);
        return "Saved Successfully!";
        } catch (DataIntegrityViolationException e) {
            return "Email already exists!";
        }
    }

    @Override
    public List<SystemUser> getAll() {
        return systemUserRepo.findAll();
    }

    @Override
    public void deleteById(Long id) {
        systemUserRepo.deleteById(id);
    }

    @Override
    public Optional<SystemUser> getById(Long id) {
        return systemUserRepo.findById(id);
    }

    @Override
    public String update(Long id, SystemUserPojo systemUserPojo) {
        try {
        SystemUser systemUser = systemUserRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("SystemUser not found with ID: " + id));

        // Set values from SystemUserPojo to SystemUser entity for update
        systemUser.setUsername(systemUserPojo.getUsername());
        systemUser.setRole(systemUserPojo.getRole());
        systemUser.setEmail(systemUserPojo.getEmail());
        systemUser.setPassword(systemUserPojo.getPassword());

        systemUserRepo.save(systemUser);
        return "Updated Successfully!";
        } catch (DataIntegrityViolationException e) {
            return "Email already exists!";
        }
    }

    @Override
    public Optional<SystemUser> getByEmail(String email) {
        return systemUserRepo.findByEmail(email);
    }

    // Other custom service methods, if any
}
