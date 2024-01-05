package com.adreams.abroad_dreams_back.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Entity
@Table(name = "students")
@Getter
@Setter
public class Student implements UserDetails {

    @Id
    @GeneratedValue(generator = "students_seq_gen", strategy = GenerationType.SEQUENCE)
    private Long studentId;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "email")
    private String email;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL)
    @JsonManagedReference  // Break the circular reference
    private List<Appointment> appointments;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public String getPassword() {
        // Return the password for the user.
        return this.password;
    }

    @Override
    public String getUsername() {
        // Return the username for the user.
        return this.username;
    }

    @Override
    public boolean isAccountNonExpired() {
        // Return whether the user account is not expired.
        // For simplicity, always return true.
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        // Return whether the user account is not locked.
        // For simplicity, always return true.
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        // Return whether the user's credentials (password) are not expired.
        // For simplicity, always return true.
        return true;
    }

    @Override
    public boolean isEnabled() {
        // Return whether the user account is enabled.
        // For simplicity, always return true.
        return true;
    }


}
