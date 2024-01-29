package com.adreams.abroad_dreams_back.service;

import com.adreams.abroad_dreams_back.entity.Appointment;
import com.adreams.abroad_dreams_back.pojo.AppointmentPojo;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

public interface AppointmentService {

    String save(AppointmentPojo appointmentPojo);

    List<Appointment> getAll();

    void deleteById(Long id);

    Optional<Appointment> getById(Long id);

    String update(Long id, AppointmentPojo appointmentPojo);

    List<Appointment> getByDate(Date date);

}
