package project.management.services;

import project.management.dto.FeatureTaskRequestDto;
import project.management.dto.FeatureTaskResponseDto;

import java.util.List;

public interface FeatureTaskService {

    FeatureTaskResponseDto addFeatureTask(FeatureTaskRequestDto FeatureTaskRequestDto);

    FeatureTaskResponseDto getFeatureTaskById(Long taskId);

    FeatureTaskResponseDto updateFeatureTask(FeatureTaskRequestDto featureTaskRequest);

    void deleteFeatureTask(Long taskId);

    List<FeatureTaskResponseDto> getFeatureTasksByProjectId(Long projectId);

    List<FeatureTaskResponseDto> getFeatureTasksByPriority(String priority);

    List<FeatureTaskResponseDto> searchFeatureTasksByAcceptanceCriteria(String acceptanceCriteria);

    FeatureTaskResponseDto assignTaskToUser(Long taskId, Long userId);
}
