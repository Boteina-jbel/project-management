package project.management.dto;

import lombok.Data;
import project.management.entities.TaskStatus;
import project.management.entities.User;

import java.util.Date;

@Data
public class FeatureTaskRequestDto {

    private String name;
    private String description;
    private Long statusId;
    private Date createdAt;
    private Long userAssignedToId;
    private Long projectId;
    private String priority;
    private String acceptanceCriteria;
}
