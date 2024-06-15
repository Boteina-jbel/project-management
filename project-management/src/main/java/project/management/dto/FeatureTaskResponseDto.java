package project.management.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import project.management.entities.*;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FeatureTaskResponseDto {

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
        private String acceptanceCriteria;

}
