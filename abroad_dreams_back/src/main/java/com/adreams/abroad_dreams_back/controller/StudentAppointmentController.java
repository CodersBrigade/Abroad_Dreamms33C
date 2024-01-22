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
@RequestMapping("student/appointments")
@RequiredArgsConstructor
public class StudentAppointmentController {

    private final AppointmentService appointmentService;

    @PostMapping(value = "/save")
    public String saveAppointment(@Valid @RequestBody AppointmentPojo appointmentPojo) {
        appointmentService.save(appointmentPojo);
        return "Saved Successfully!";
    }




}
