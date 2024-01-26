package com.adreams.abroad_dreams_back.controller;


import com.adreams.abroad_dreams_back.pojo.EmailRequest;
import com.adreams.abroad_dreams_back.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/recover")
@RequiredArgsConstructor
public class EmailController {

    private final EmailService emailService;

    @PostMapping("/by-email")
    public void sendEmail(@RequestBody EmailRequest emailRequest) {
        this.emailService.sendCustomerConfirmationEmail(emailRequest);
    }


    @PostMapping("/reset-password")
    public void resetPassword(@RequestBody EmailRequest emailRequest){
        this.emailService.resetPassword(emailRequest);
    }

}
