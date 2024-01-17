package com.adreams.abroad_dreams_back.service.impl;

import com.adreams.abroad_dreams_back.entity.Notice;
import com.adreams.abroad_dreams_back.pojo.NoticePojo;
import com.adreams.abroad_dreams_back.repo.NoticeRepo;
import com.adreams.abroad_dreams_back.service.NoticeService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NoticeServiceImpl implements NoticeService {

    private final NoticeRepo noticeRepo;

    @Override
    public String save(NoticePojo noticePojo) {
        Notice notice;

        try {
            if (noticePojo.getNoticeId() != null) {
                notice = noticeRepo.findById(noticePojo.getNoticeId())
                        .orElseThrow(() -> new EntityNotFoundException("Notice not found with ID: " + noticePojo.getNoticeId()));
            } else {
                notice = new Notice();
            }

            // Set values from NoticePojo to Notice entity
            notice.setDate(noticePojo.getDate());
            notice.setDescription(noticePojo.getDescription());
            notice.setTitle(noticePojo.getTitle());

            noticeRepo.save(notice);
            return "Saved Successfully!";
        } catch (DataIntegrityViolationException e) {
            return "Error saving notice!";
        }
    }

    @Override
    public List<Notice> getAll() {
        return noticeRepo.findAll();
    }

    @Override
    public void deleteById(Long id) {
        noticeRepo.deleteById(id);
    }

    @Override
    public Optional<Notice> getById(Long id) {
        return noticeRepo.findById(id);
    }

    @Override
    public String update(Long id, NoticePojo noticePojo) {
        try {
            Notice notice = noticeRepo.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Notice not found with ID: " + id));

            // Set values from NoticePojo to Notice entity for update
            notice.setDate(noticePojo.getDate());
            notice.setDescription(noticePojo.getDescription());
            notice.setTitle(noticePojo.getTitle());

            noticeRepo.save(notice);
            return "Updated Successfully!";
        } catch (DataIntegrityViolationException e) {
            return "Error updating notice!";
        }
    }
}
