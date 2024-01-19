package com.adreams.abroad_dreams_back.pojo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticateResponse {

    private String token;
    private String role;
    private Long userId;
    private String username;
    private String email;


}
