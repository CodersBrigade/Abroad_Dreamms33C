package com.adreams.abroad_dreams_back.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "student_profiles")
@Getter
@Setter
public class StudentProfile {

    @Id
    @GeneratedValue(generator = "student_profiles_seq_gen", strategy = GenerationType.SEQUENCE)
    private Long profileId;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @Column(name = "see_document_upload")
    private String seeDocumentUpload;

    @Column(name = "plus2_document_upload")
    private String plus2DocumentUpload;

    @Column(name = "language_document_upload")
    private String languageDocumentUpload;

    @Column(name = "experiences_others")
    private String experiencesOthers;

    @Column(name = "profile_status", nullable = false)
    private String profileStatus;

}
