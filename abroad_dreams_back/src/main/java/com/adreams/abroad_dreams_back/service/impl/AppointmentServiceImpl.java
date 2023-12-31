package com.adreams.abroad_dreams_back.service.impl;

import com.adreams.abroad_dreams_back.entity.Appointment;
import com.adreams.abroad_dreams_back.repo.AppointmentRepo;
import com.adreams.abroad_dreams_back.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepo appointmentRepo; // Updated reference

    @Autowired
    public AppointmentServiceImpl(AppointmentRepo appointmentRepo) { // Updated constructor parameter
        this.appointmentRepo = appointmentRepo;
    }


    @Override
    public Appointment saveAppointment(Appointment appointment) {
        // Custom logic if needed before saving
        return appointmentRepo.save(appointment);
    }

    @Override
    public List<Appointment> getAllAppointments() {
        return appointmentRepo.findAll();
    }

    @Override
    public Appointment updateAppointment(Long appointmentId, Appointment updatedAppointment) {
        // Custom logic if needed before updating
        updatedAppointment.setAppointmentId(appointmentId);
        return appointmentRepo.save(updatedAppointment);
    }

    @Override
    public void deleteAppointment(Long appointmentId) {
        appointmentRepo.deleteById(appointmentId);
    }

    @Override
    public Appointment searchByAppointmentId(Long appointmentId) {
        return appointmentRepo.findById(appointmentId).orElse(null);
    }

    @Override
    public List<Appointment> searchByStatus(String status) {
        return appointmentRepo.findAllByStatus(status);
    }
}
