package com.adreams.abroad_dreams_back.init;

import com.adreams.abroad_dreams_back.entity.Role;
import com.adreams.abroad_dreams_back.entity.SystemUser;
import com.adreams.abroad_dreams_back.repo.RoleRepo;
import com.adreams.abroad_dreams_back.repo.SystemUserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Optional;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private RoleRepo roleRepo;

    @Autowired
    private SystemUserRepo systemUserRepo;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Check if roles exist, if not, create them
        Optional<Role> adminRoleOptional = roleRepo.findByName("Admin");
        Role adminRole = adminRoleOptional.orElseGet(() -> {
            Role role = Role.builder().name("Admin").build();
            return roleRepo.save(role);
        });

        Optional<Role> studentRoleOptional = roleRepo.findByName("Student");
        Role studentRole = studentRoleOptional.orElseGet(() -> {
            Role role = Role.builder().name("Student").build();
            return roleRepo.save(role);
        });

        // Check if admin user exists, if not, create it
        Optional<SystemUser> adminUserOptional = systemUserRepo.findByEmail("abroad.dreams.com@gmail.com");
        if (adminUserOptional.isEmpty()) {
            SystemUser adminUser = SystemUser.builder()
                    .email("abroad.dreams.com@gmail.com")
                    .password(passwordEncoder.encode("$2a$12$8QnQpAeSERbdP8/epfWtJOyhwcysnyHEPItkv1mbVbbqkRJOSBbZ."))
                    .role("Admin")
                    .username("admin")
                    .roles(Arrays.asList(adminRole))
                    .build();

            systemUserRepo.save(adminUser);
        }
    }
}
