package com.adreams.abroad_dreams_back.service;

import com.adreams.abroad_dreams_back.entity.Role;

import java.util.List;
import java.util.Optional;

public interface RoleService {

    String save(Role role);

    List<Role> getAll();

    Optional<Role> getById(Integer id);

    void deleteById(Integer id);

    String update(Integer id, Role role);
}
