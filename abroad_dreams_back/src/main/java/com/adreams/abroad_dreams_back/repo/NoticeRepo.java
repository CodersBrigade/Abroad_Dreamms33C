package com.adreams.abroad_dreams_back.repo;

import com.adreams.abroad_dreams_back.entity.Notice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoticeRepo extends JpaRepository<Notice, Long> {
}
