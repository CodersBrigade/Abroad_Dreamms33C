package com.adreams.abroad_dreams_back.repo;

import com.adreams.abroad_dreams_back.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepo extends JpaRepository<Role, Integer> {
    Optional<Role> findByName(String name);

}
