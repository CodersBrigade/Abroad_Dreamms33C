package com.adreams.abroad_dreams_back.controller;

import com.adreams.abroad_dreams_back.entity.Payment;
import com.adreams.abroad_dreams_back.pojo.PaymentPojo;
import com.adreams.abroad_dreams_back.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/student/payments")
@RequiredArgsConstructor
public class StudentPaymentController {

    private final PaymentService paymentService;

    @GetMapping("getByPaymentId/{id}")
    public Optional<Payment> getPaymentById(@PathVariable Long id) {
        return paymentService.getById(id);
    }

    @GetMapping("getById/{userId}")
    public List<Payment> getPaymentsByUserId(@PathVariable Long userId) {
        return paymentService.getByUserId(userId);
    }

    @PutMapping("update/{id}")
    public String updatePayment(@PathVariable Long id, @RequestBody PaymentPojo paymentPojo) {
        return paymentService.update(id, paymentPojo);
    }

    @GetMapping("/status/{status}")
    public List<Payment> getPaymentsByStatus(@PathVariable String status) {
        return paymentService.getByStatus(status);
    }

    @GetMapping("/date/{date}")
    public List<Payment> getPaymentsByDate(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date date) {
        return paymentService.getByDate(date);
    }

}
