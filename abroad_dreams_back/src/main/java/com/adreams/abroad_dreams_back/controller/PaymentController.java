package com.adreams.abroad_dreams_back.controller;

import com.adreams.abroad_dreams_back.entity.Payment;
import com.adreams.abroad_dreams_back.pojo.PaymentPojo;
import com.adreams.abroad_dreams_back.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admin/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/save")
    public String savePayment(@RequestBody PaymentPojo paymentPojo) {
        return paymentService.save(paymentPojo);
    }

    @GetMapping("/getAll")
    public List<Payment> getAllPayments() {
        return paymentService.getAll();
    }

    @GetMapping("/getByPaymentId/{id}")
    public Optional<Payment> getPaymentById(@PathVariable Long id) {
        return paymentService.getById(id);
    }

    @GetMapping("/getByStatus/{status}")
    public List<Payment> getPaymentsByStatus(@PathVariable String status) {
        return paymentService.getByStatus(status);
    }
    @GetMapping("/getByUserId/{userId}")
    public List<Payment> getPaymentsByUserId(@PathVariable Long userId) {
        return paymentService.getByUserId(userId);
    }

    @PutMapping("update/{id}")
    public String updatePayment(@PathVariable Long id, @RequestBody PaymentPojo paymentPojo) {
        return paymentService.update(id, paymentPojo);
    }

    @DeleteMapping("delete/{id}")
    public void deletePaymentById(@PathVariable Long id) {
        paymentService.deleteById(id);
    }
}
