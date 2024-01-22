package com.adreams.abroad_dreams_back.controller;

import com.adreams.abroad_dreams_back.entity.Appointment;
import com.adreams.abroad_dreams_back.pojo.AppointmentPojo;
import com.adreams.abroad_dreams_back.service.AppointmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;

    @PostMapping(value = "/save")
    public String saveAppointment(@Valid @RequestBody AppointmentPojo appointmentPojo) {
        appointmentService.save(appointmentPojo);
        return "Saved Successfully!";
    }

    @GetMapping("/getAll")
    public List<Appointment> getAll() {
        return this.appointmentService.getAll();
    }

    @GetMapping("/getById/{id}")
    public Optional<Appointment> getById(@PathVariable("id") Long id) {
        return this.appointmentService.getById(id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteById(@PathVariable("id") Long id) {
        this.appointmentService.deleteById(id);
    }

    @PutMapping("/update/{id}")
    public String update(@PathVariable("id") Long id, @Valid @RequestBody AppointmentPojo appointmentPojo) {
        return this.appointmentService.update(id, appointmentPojo);
    }

    @GetMapping("/getByDate")
    public List<Appointment> getByDate(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date date) {
        return this.appointmentService.getByDate(date);
    }
}
