package com.adreams.abroad_dreams_back.repo;

import com.adreams.abroad_dreams_back.entity.SystemUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SystemUserRepo extends JpaRepository<SystemUser, Long> {

    Optional<SystemUser> findByEmail(String email);


}
