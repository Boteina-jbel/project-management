package project.management.dto;

import lombok.Data;

@Data
public class FeatureTaskRequestDto {

    private Long id;
    private String name;
    private String description;
    private String priority;
    private String acceptanceCriteria;

}

