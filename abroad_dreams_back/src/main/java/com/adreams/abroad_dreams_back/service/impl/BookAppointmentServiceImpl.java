package com.adreams.abroad_dreams_back.service.impl;

import com.adreams.abroad_dreams_back.entity.Appointment;
import com.adreams.abroad_dreams_back.entity.BookAppointment;
import com.adreams.abroad_dreams_back.pojo.BookAppointmentPojo;
import com.adreams.abroad_dreams_back.repo.BookAppointmentRepo;
import com.adreams.abroad_dreams_back.service.BookAppointmentService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.sql.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookAppointmentServiceImpl implements BookAppointmentService {

    private final BookAppointmentRepo bookAppointmentRepo;

    @Override
    public String save(BookAppointmentPojo bookAppointmentPojo) throws IOException {
        BookAppointment bookAppointment;

        if (bookAppointmentPojo.getBookAppointmentId() != null) {
            bookAppointment = bookAppointmentRepo.findById(bookAppointmentPojo.getBookAppointmentId())
                    .orElseThrow(() -> new EntityNotFoundException("BookAppointment not found with ID: " + bookAppointmentPojo.getBookAppointmentId()));
        } else {
            bookAppointment = new BookAppointment();
        }

        bookAppointment.setDate(bookAppointmentPojo.getDate());
        bookAppointment.setFullName(bookAppointmentPojo.getFullName());
        bookAppointment.setEmail(bookAppointmentPojo.getEmail());
        bookAppointment.setMobileNumber(bookAppointmentPojo.getMobileNumber());
        bookAppointment.setApproved(bookAppointmentPojo.isApproved());

        // Additional logic for saving, if needed

        bookAppointmentRepo.save(bookAppointment);
        return "Book appointment saved successfully!";
    }

    @Override
    public List<BookAppointment> getAll() {
        return bookAppointmentRepo.findAll();
    }

    @Override
    public void deleteById(Long id) {
        bookAppointmentRepo.deleteById(id);
    }

    @Override
    public Optional<BookAppointment> getById(Long id) {
        return bookAppointmentRepo.findById(id);
    }

    @Override
    public String update(Long id, BookAppointmentPojo bookAppointmentPojo) {
        BookAppointment existingBookAppointment = bookAppointmentRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("BookAppointment not found with ID: " + id));

        existingBookAppointment.setDate(bookAppointmentPojo.getDate());
        existingBookAppointment.setFullName(bookAppointmentPojo.getFullName());
        existingBookAppointment.setEmail(bookAppointmentPojo.getEmail());
        existingBookAppointment.setMobileNumber(bookAppointmentPojo.getMobileNumber());
        existingBookAppointment.setApproved(bookAppointmentPojo.isApproved());

        // Additional logic for updating, if needed

        bookAppointmentRepo.save(existingBookAppointment);
        return "Book appointment updated successfully!";
    }

    @Override
    public List<Appointment> getByDate(Date date) {
        return null;
    }
}
