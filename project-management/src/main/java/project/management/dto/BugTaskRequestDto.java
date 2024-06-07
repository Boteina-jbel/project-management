package project.management.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BugTaskRequestDto {

    private String name;
    private String description;
    private String EstimatedTime;
    private Long statusId;
    private Long assignedToId;
    private Long projectId;
    private String severity;
    private String stepsToReproduce;
}
