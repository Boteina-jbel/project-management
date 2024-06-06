package project.management.services;

import project.management.dto.FeatureTaskRequestDto;
import project.management.dto.FeatureTaskResponseDto;

import java.util.List;

public interface FeatureTaskService {

    FeatureTaskResponseDto addFeatureTask(FeatureTaskRequestDto featureTaskRequestDto, String username);

    FeatureTaskResponseDto getFeatureTaskById(Long taskId);

    FeatureTaskResponseDto updateFeatureTask(Long taskId, FeatureTaskRequestDto featureTaskRequestDto);

    void deleteFeatureTask(Long taskId);

    List<FeatureTaskResponseDto> getFeatureTasksByProjectId(Long projectId);

    List<FeatureTaskResponseDto> getFeatureTasksByPriority(String priority);

    List<FeatureTaskResponseDto> searchFeatureTasksByAcceptanceCriteria(String acceptanceCriteria);

    FeatureTaskResponseDto assignTaskToUser(Long taskId, Long userId);

    FeatureTaskResponseDto changeTaskStatus(Long taskId, String status);

    List<FeatureTaskResponseDto> findAll();

}
