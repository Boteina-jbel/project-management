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
public class FeatureTaskRequestDto {

    private String name;
    private String description;
    private String EstimatedTime;
    private Date createdAt;
    private User createdBy;
    private User assignedTo;
    private Project project;
    private TaskStatus status;
    private Priority priority;
    private String acceptanceCriteria;

}
