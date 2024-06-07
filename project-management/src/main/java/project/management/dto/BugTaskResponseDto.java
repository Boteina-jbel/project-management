package project.management.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import project.management.entities.Project;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BugTaskResponseDto {

    private Long id;
    private String name;
    private String description;
    private String EstimatedTime;
    private String statusName;
    private Long assignedToId;
    private String assignedToName;
    private Project project;
    private String projectName;
    private Date createdAt;
    private String severity;
    private String stepsToReproduce;
}
