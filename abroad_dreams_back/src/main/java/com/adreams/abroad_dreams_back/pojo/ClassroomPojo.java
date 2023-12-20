package com.adreams.abroad_dreams_back.pojo;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClassroomPojo {

    private Long classroomId;

    @NotNull
    private String roomNumber;

    @NotNull
    private int capacity;

    // You can add more attributes as needed
}
