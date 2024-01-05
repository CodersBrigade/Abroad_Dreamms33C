package com.adreams.abroad_dreams_back.service;

import com.adreams.abroad_dreams_back.pojo.AuthenticateRequest;
import com.adreams.abroad_dreams_back.pojo.AuthenticateResponse;

public interface AuthenticateService {

    AuthenticateResponse authenticate(AuthenticateRequest authenticateRequest);
}
