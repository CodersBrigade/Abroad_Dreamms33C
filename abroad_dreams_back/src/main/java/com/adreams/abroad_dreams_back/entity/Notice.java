package com.adreams.abroad_dreams_back.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "notices")
public class Notice {

    @Id
    @SequenceGenerator(name = "notice_seq_gen", sequenceName = "notice_id_seq", allocationSize = 1)
    @GeneratedValue(generator = "notice_seq_gen", strategy = GenerationType.SEQUENCE)
    private Long noticeId;

    @Column(name = "date", nullable = false)
    private Date date;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "title", nullable = false)
    private String title;
}
