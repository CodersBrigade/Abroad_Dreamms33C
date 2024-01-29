package com.adreams.abroad_dreams_back.service;
import com.adreams.abroad_dreams_back.entity.Appointment;
import com.adreams.abroad_dreams_back.entity.BookAppointment;
import com.adreams.abroad_dreams_back.pojo.BookAppointmentPojo;


import java.io.IOException;
import java.sql.Date;
import java.util.List;
import java.util.Optional;

public interface BookAppointmentService {
    String save(BookAppointmentPojo bookAppointmentPojo)  throws IOException;

    List<BookAppointment> getAll();

    void deleteById(Long id);

    Optional<BookAppointment> getById(Long id);

    String update(Long id, BookAppointmentPojo bookAppointmentPojo);

    List<Appointment> getByDate(Date date);
}
