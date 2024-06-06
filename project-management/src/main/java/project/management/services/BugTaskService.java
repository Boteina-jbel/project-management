package project.management.services;

import project.management.dto.BugTaskRequestDto;
import project.management.dto.BugTaskResponseDto;
import project.management.dto.FeatureTaskResponseDto;

import java.util.List;

public interface BugTaskService {

    BugTaskResponseDto addBugTask(BugTaskRequestDto bugTaskRequestDto, String username);

    BugTaskResponseDto getBugTaskById(Long taskId);

    BugTaskResponseDto updateBugTask(Long taskId, BugTaskRequestDto bugTaskRequestDto);

    void deleteBugTask(Long taskId);

    List<BugTaskResponseDto> getBugTasksByProjectId(Long projectId);

    // List<BugTaskResponseDto> getBugTasksBySeverity(String severity);

    List<BugTaskResponseDto> getFeatureTasksByPriority(String priority);

    BugTaskResponseDto assignTaskToUser(Long taskId, Long userId);

    BugTaskResponseDto changeTaskStatus(Long taskId, String status);
}
