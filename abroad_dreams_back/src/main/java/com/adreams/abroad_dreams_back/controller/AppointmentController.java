package com.adreams.abroad_dreams_back.controller;

import com.adreams.abroad_dreams_back.entity.Appointment;
import com.adreams.abroad_dreams_back.pojo.AppointmentPojo;
import com.adreams.abroad_dreams_back.service.AppointmentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {

    private final AppointmentService appointmentService;

    @Autowired
    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @PostMapping("/save")
    public Appointment saveAppointment(@Valid @RequestBody Appointment appointment) {
        return appointmentService.saveAppointment(appointment);
    }

    @GetMapping("/getAll")
    public List<Appointment> getAllAppointments() {
        return appointmentService.getAllAppointments();
    }

    @PutMapping("/update/{appointmentId}")
    public Appointment updateAppointment(@PathVariable Long appointmentId, @RequestBody Appointment updatedAppointment) {
        return appointmentService.updateAppointment(appointmentId, updatedAppointment);
    }

    @DeleteMapping("/delete/{appointmentId}")
    public void deleteAppointment(@PathVariable Long appointmentId) {
        appointmentService.deleteAppointment(appointmentId);
    }

    @GetMapping("/getById/{appointmentId}")
    public Appointment searchByAppointmentId(@PathVariable Long appointmentId) {
        return appointmentService.searchByAppointmentId(appointmentId);
    }

    @GetMapping("/status/{status}")
    public List<Appointment> searchByStatus(@PathVariable String status) {
        return appointmentService.searchByStatus(status);
    }
}
