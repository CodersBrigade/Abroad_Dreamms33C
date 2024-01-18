package com.adreams.abroad_dreams_back.service;

import com.adreams.abroad_dreams_back.entity.Notice;
import com.adreams.abroad_dreams_back.pojo.NoticePojo;

import java.util.List;
import java.util.Optional;

public interface NoticeService {

    String save(NoticePojo noticePojo);

    List<Notice> getAll();

    void deleteById(Long id);

    Optional<Notice> getById(Long id);

    String update(Long id, NoticePojo noticePojo);
}
