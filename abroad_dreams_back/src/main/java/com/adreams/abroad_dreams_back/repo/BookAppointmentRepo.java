package com.adreams.abroad_dreams_back.repo;

import com.adreams.abroad_dreams_back.entity.Appointment;
import com.adreams.abroad_dreams_back.entity.BookAppointment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Date;
import java.util.List;

public interface BookAppointmentRepo extends JpaRepository<BookAppointment,Long> {
    List<BookAppointment> findByDate(Date date);
}
