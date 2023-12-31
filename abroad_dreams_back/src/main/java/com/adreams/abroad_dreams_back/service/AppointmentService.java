package com.adreams.abroad_dreams_back.service;

import com.adreams.abroad_dreams_back.entity.Appointment;

import java.util.List;

public interface AppointmentService {
    Appointment saveAppointment(Appointment appointment);
    List<Appointment> getAllAppointments();
    Appointment updateAppointment(Long appointmentId, Appointment updatedAppointment);
    void deleteAppointment(Long appointmentId);
    Appointment searchByAppointmentId(Long appointmentId);
    List<Appointment> searchByStatus(String status);
}
