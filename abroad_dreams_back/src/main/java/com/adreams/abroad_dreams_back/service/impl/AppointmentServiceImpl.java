package com.adreams.abroad_dreams_back.service.impl;

import com.adreams.abroad_dreams_back.entity.Appointment;
import com.adreams.abroad_dreams_back.pojo.AppointmentPojo;
import com.adreams.abroad_dreams_back.repo.AppointmentRepo;
import com.adreams.abroad_dreams_back.service.AppointmentService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepo appointmentRepo;

    @Override
    public String save(AppointmentPojo appointmentPojo) {
        Appointment appointment;

        if (appointmentPojo.getAppointmentId() != null) {
            appointment = appointmentRepo.findById(appointmentPojo.getAppointmentId())
                    .orElseThrow(() -> new EntityNotFoundException("Appointment not found with ID: " + appointmentPojo.getAppointmentId()));
        } else {
            appointment = new Appointment();
        }

        appointment.setDate(appointmentPojo.getDate());
        appointment.setFullName(appointmentPojo.getFullName());
        appointment.setEmail(appointmentPojo.getEmail());
        appointment.setMobileNumber(appointmentPojo.getMobileNumber());
        appointment.setPurpose(appointmentPojo.getPurpose());

        appointmentRepo.save(appointment);
        return "Saved Successfully!";
    }

    @Override
    public List<Appointment> getAll() {
        return appointmentRepo.findAll();
    }

    @Override
    public List<Appointment> getByDate(Date date) {
        return appointmentRepo.findByDate(date);
    }

    @Override
    public void deleteById(Long id) {
        appointmentRepo.deleteById(id);
    }

    @Override
    public Optional<Appointment> getById(Long id) {
        return appointmentRepo.findById(id);
    }

    @Override
    public String update(Long id, AppointmentPojo appointmentPojo) {
        Appointment existingAppointment = appointmentRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Appointment not found with ID: " + id));

        existingAppointment.setDate(appointmentPojo.getDate());
        existingAppointment.setFullName(appointmentPojo.getFullName());
        existingAppointment.setEmail(appointmentPojo.getEmail());
        existingAppointment.setMobileNumber(appointmentPojo.getMobileNumber());
        existingAppointment.setPurpose(appointmentPojo.getPurpose());

        appointmentRepo.save(existingAppointment);
        return "Updated Successfully!";
    }

    // Other custom service methods, if any
}
