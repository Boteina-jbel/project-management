package project.management.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import project.management.entities.Priority;
import project.management.entities.Project;
import project.management.entities.TaskStatus;
import project.management.entities.User;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BugTaskResponseDto {

    private Long id;
    private String name;
    private String description;
    private String EstimatedTime;
    private TaskStatus status;
    private Date createdAt;
    private User assignedTo;
    private User createdBy;
    private Project project;
    private Priority priority;
    private String stepsToReproduce;

}
