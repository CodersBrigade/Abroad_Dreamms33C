package com.adreams.abroad_dreams_back.controller;

import com.adreams.abroad_dreams_back.entity.Appointment;
import com.adreams.abroad_dreams_back.entity.BookAppointment;
import com.adreams.abroad_dreams_back.pojo.BookAppointmentPojo;
import com.adreams.abroad_dreams_back.service.BookAppointmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.sql.Date;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/book/appointment")
@RequiredArgsConstructor
public class BookAppointmentController {

    private final BookAppointmentService bookAppointmentService;

    @PostMapping("/save")
    public ResponseEntity<String> save(@RequestBody @Valid BookAppointmentPojo bookAppointmentPojo) throws IOException {
        String saveResponse = bookAppointmentService.save(bookAppointmentPojo);
        return new ResponseEntity<>(saveResponse, HttpStatus.CREATED);
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<BookAppointment>> getAll() {
        List<BookAppointment> appointments = bookAppointmentService.getAll();
        return new ResponseEntity<>(appointments, HttpStatus.OK);
    }

    @GetMapping("/getById/{id}")
    public ResponseEntity<Optional<BookAppointment>> getById(@PathVariable("id") Long id) {
        Optional<BookAppointment> appointment = bookAppointmentService.getById(id);
        return new ResponseEntity<>(appointment, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable("id") Long id) {
        bookAppointmentService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> update(@PathVariable("id") Long id, @Valid @RequestBody BookAppointmentPojo bookAppointmentPojo) {
        String updateResponse = bookAppointmentService.update(id, bookAppointmentPojo);
        return new ResponseEntity<>(updateResponse, HttpStatus.OK);
    }

    @GetMapping("/getByDate")
    public ResponseEntity<List<Appointment>> getByDate(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date date) {
        List<Appointment> bookAppointments = bookAppointmentService.getByDate(date);
        return new ResponseEntity<>(bookAppointments, HttpStatus.OK);
    }
}
