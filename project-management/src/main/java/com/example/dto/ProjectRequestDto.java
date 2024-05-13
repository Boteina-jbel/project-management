package com.example.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProjectRequestDto {

    private String name;
    private String description;
    private Date createdAt;
    private Long createdById;
}
