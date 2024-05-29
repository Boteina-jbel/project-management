package project.management.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import project.management.entities.FeatureTask;
import project.management.entities.Project;
import project.management.entities.TaskStatus;
import project.management.entities.User;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FeatureTaskResponseDto {

        private Long id;
        private String name;
        private String description;
        private TaskStatus status;
        private Date createdAt;
        private User assignedTo;
        private Project project;
        private String priority;
        private String acceptanceCriteria;

}
