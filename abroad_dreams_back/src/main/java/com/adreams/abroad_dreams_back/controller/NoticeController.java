package com.adreams.abroad_dreams_back.controller;

import com.adreams.abroad_dreams_back.entity.Notice;
import com.adreams.abroad_dreams_back.helper.ApiResponse;
import com.adreams.abroad_dreams_back.pojo.NoticePojo;
import com.adreams.abroad_dreams_back.service.NoticeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/notices")
@RequiredArgsConstructor
public class NoticeController {

    private final NoticeService noticeService;
    private final ApiResponse apiResponse;

    @PostMapping("/save")
    public ResponseEntity<Map<String, Object>> saveNotice(@Valid @RequestBody NoticePojo noticePojo) {
        return apiResponse.successResponse("Data saved successfully", true, null, noticeService.save(noticePojo));
    }

    @GetMapping("/getAll")
    public List<Notice> getAll() {
        return noticeService.getAll();
    }

    @GetMapping("/getById/{id}")
    public Optional<Notice> getById(@PathVariable("id") Long id) {
        return noticeService.getById(id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteById(@PathVariable("id") Long id) {
        noticeService.deleteById(id);
    }

    @PutMapping("/update/{id}")
    public String updateNotice(@PathVariable("id") Long id, @Valid @RequestBody NoticePojo noticePojo) {
        return noticeService.update(id, noticePojo);
    }
}
