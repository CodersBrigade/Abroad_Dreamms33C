package com.adreams.abroad_dreams_back.service;

import com.adreams.abroad_dreams_back.entity.Appointment;

import java.util.List;

public interface AppointmentService {
    List<Appointment> getAllAppointments();

    Appointment getAppointmentById(Long appointmentId);

    Appointment saveAppointment(Appointment appointment);

    void deleteAppointment(Long appointmentId);
}
