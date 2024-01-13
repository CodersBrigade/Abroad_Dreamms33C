package com.adreams.abroad_dreams_back.service.impl;

import com.adreams.abroad_dreams_back.entity.Payment;
import com.adreams.abroad_dreams_back.pojo.PaymentPojo;
import com.adreams.abroad_dreams_back.repo.PaymentRepo;
import com.adreams.abroad_dreams_back.service.PaymentService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepo paymentRepo;

    @Override
    public String save(PaymentPojo paymentPojo) {
        Payment payment = new Payment();
        payment.setUserId(paymentPojo.getUserId());
        payment.setAmount(paymentPojo.getAmount());
        payment.setDescription(paymentPojo.getDescription());
        payment.setPaymentDate(paymentPojo.getPaymentDate());
        payment.setStatus(paymentPojo.getStatus());

        paymentRepo.save(payment);
        return "Payment Saved Successfully!";
    }

    @Override
    public List<Payment> getByStatus(String status) {
        return paymentRepo.findByStatus(status);
    }

    @Override
    public List<Payment> getByDate(Date date) {
        return paymentRepo.findByPaymentDate(date);
    }

    @Override
    public List<Payment> getAll() {
        return paymentRepo.findAll();
    }

    @Override
    public List<Payment> getByUserId(Long userId) {
        return paymentRepo.findByUserId(userId);
    }

    @Override
    public Optional<Payment> getById(Long id) {
        return paymentRepo.findById(id);
    }

    @Override
    public void deleteById(Long id) {
        paymentRepo.deleteById(id);
    }

    @Override
    public String update(Long id, PaymentPojo paymentPojo) {
        Payment payment = paymentRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Payment not found with ID: " + id));

        payment.setUserId(paymentPojo.getUserId());
        payment.setAmount(paymentPojo.getAmount());
        payment.setDescription(paymentPojo.getDescription());
        payment.setPaymentDate(paymentPojo.getPaymentDate());
        payment.setStatus(paymentPojo.getStatus());

        paymentRepo.save(payment);
        return "Payment Updated Successfully!";
    }
}
