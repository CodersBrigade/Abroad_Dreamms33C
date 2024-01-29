package com.adreams.abroad_dreams_back.service;

import com.adreams.abroad_dreams_back.pojo.EmailRequest;

public interface EmailService {

    void sendCustomerConfirmationEmail(EmailRequest emailRequest);


    void resetPassword(EmailRequest emailRequest);
}
