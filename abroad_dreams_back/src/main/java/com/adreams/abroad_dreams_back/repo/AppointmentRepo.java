package com.adreams.abroad_dreams_back.repo;

import com.adreams.abroad_dreams_back.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AppointmentRepo extends JpaRepository<Appointment, Long> {

    List<Appointment> findAllByStatus(String status);
}
