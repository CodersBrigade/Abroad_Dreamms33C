package com.adreams.abroad_dreams_back.pojo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudentPojo {

    private Long studentId;

    private String username;

    private String password;

    private String email;

}
