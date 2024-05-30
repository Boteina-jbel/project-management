package project.management.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import project.management.entities.TaskStatus;
import project.management.entities.User;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
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
