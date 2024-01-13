package com.adreams.abroad_dreams_back.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "payment")
@Getter
@Setter
public class Payment {

    @Id
    @SequenceGenerator(name = "payment_seq_gen", sequenceName = "payment_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "payment_id")
    private Long paymentId;

    @Column(name = "user_id", nullable = true)
    private Long userId;

    @Column(name = "amount", nullable = false)
    private Double amount;

    @Column(name = "description", nullable = true)
    private String description;

    @Column(name = "payment_date", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date paymentDate;

    @Column(name = "status", nullable = false)
    private String status;

}
