package project.management.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProjectResponseDto {

    private Long id;
    private String name;
    private String description;
    private Date createdAt;
    private UserResponseDto createdBy;

}
