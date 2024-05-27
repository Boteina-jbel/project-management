package project.management.dto;

import project.management.entities.TaskStatus;
import project.management.entities.User;

import java.util.Date;

public class FeatureTaskResponseDto {
        private Long id;
        private String name;
        private String description;
        private TaskStatus status;
        private Date createdAt;
        private User assignedTo;
        private Long projectId;
        private String priority;
        private String acceptanceCriteria;

}
