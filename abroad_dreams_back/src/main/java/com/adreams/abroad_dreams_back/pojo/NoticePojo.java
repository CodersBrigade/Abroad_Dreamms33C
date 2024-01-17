package com.adreams.abroad_dreams_back.pojo;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class NoticePojo {

    private Long noticeId;

    private Date date;

    private String description;

    private String title;
}
