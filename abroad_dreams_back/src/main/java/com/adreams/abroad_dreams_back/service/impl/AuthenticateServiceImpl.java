package com.adreams.abroad_dreams_back.service.impl;

import com.adreams.abroad_dreams_back.entity.SystemUser;
import com.adreams.abroad_dreams_back.pojo.AuthenticateRequest;
import com.adreams.abroad_dreams_back.pojo.AuthenticateResponse;
import com.adreams.abroad_dreams_back.repo.SystemUserRepo;
import com.adreams.abroad_dreams_back.security.JwtService;
import com.adreams.abroad_dreams_back.service.AuthenticateService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticateServiceImpl implements AuthenticateService {

    private final SystemUserRepo systemUserRepo;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @Override
    public AuthenticateResponse authenticate(AuthenticateRequest authenticateRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authenticateRequest.getEmail(), authenticateRequest.getPassword()
                )
        );

        SystemUser systemUser =systemUserRepo.findByEmail(authenticateRequest.getEmail())
                .orElseThrow(() -> new EntityNotFoundException("User not found."));

        UserDetails userDetails = systemUser;

        String jwtToken = jwtService.generateToken(userDetails);
        return AuthenticateResponse.builder().token(jwtToken).role(systemUser.getName())
                .userId(systemUser.getUserId()).build();
    }
}
