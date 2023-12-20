package com.adreams.abroad_dreams_back.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "messages")
@Getter
@Setter
public class Message {

    @Id
    @GeneratedValue(generator = "messages_seq_gen", strategy = GenerationType.SEQUENCE)
    private Long messageId;

    @ManyToOne
    @JoinColumn(name = "sender_id", nullable = false)
    private SystemUser sender;

    @ManyToOne
    @JoinColumn(name = "receiver_id", nullable = false)
    private SystemUser receiver;

    @Column(name = "message", nullable = false)
    private String message;

    @Column(name = "date", nullable = false)
    private Date date;

}
