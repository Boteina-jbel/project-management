package project.management.services;

import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import project.management.dto.BugTaskRequestDto;
import project.management.dto.BugTaskResponseDto;
import project.management.entities.BugTask;
import project.management.entities.TaskStatus;
import project.management.entities.User;
import project.management.repositories.BugTaskRepository;
import project.management.repositories.TaskStatusRepository;
import project.management.repositories.UserRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BugTaskServiceImpl implements BugTaskService {

    private final BugTaskRepository bugTaskRepository;
    private final ModelMapper modelMapper;
    private final UserRepository userRepository;
    private final TaskStatusRepository taskStatusRepository;

    public BugTaskServiceImpl(BugTaskRepository bugTaskRepository, ModelMapper modelMapper, UserRepository userRepository, TaskStatusRepository taskStatusRepository) {
        this.bugTaskRepository = bugTaskRepository;
        this.modelMapper = modelMapper;
        this.userRepository = userRepository;
        this.taskStatusRepository = taskStatusRepository;
    }

    @Override
    public BugTaskResponseDto addBugTask(BugTaskRequestDto bugTaskRequestDto) {
        BugTask bugTask = modelMapper.map(bugTaskRequestDto, BugTask.class);
        BugTask savedBugTask = bugTaskRepository.save(bugTask);
        return modelMapper.map(savedBugTask, BugTaskResponseDto.class);
    }

    @Override
    public BugTaskResponseDto getBugTaskById(Long taskId) {
        BugTask bugTask = bugTaskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("BugTask not found"));
        return modelMapper.map(bugTask, BugTaskResponseDto.class);
    }

    @Override
    public BugTaskResponseDto updateBugTask(Long taskId, BugTaskRequestDto bugTaskRequestDto) {
        Optional<BugTask> bugTaskOptional = bugTaskRepository.findById(taskId);
        if (bugTaskOptional.isPresent()) {
            BugTask bugTask = modelMapper.map(bugTaskRequestDto, BugTask.class);
            // Set the ID of the task to update
            bugTask.setId(taskId);
            BugTask updatedBugTask = bugTaskRepository.save(bugTask);
            return modelMapper.map(updatedBugTask, BugTaskResponseDto.class);
        } else {
            throw new EntityNotFoundException("BugTask not found");
        }
    }

    @Override
    public void deleteBugTask(Long taskId) {
        bugTaskRepository.deleteById(taskId);
    }

    @Override
    public List<BugTaskResponseDto> getBugTasksByProjectId(Long projectId) {
        return bugTaskRepository.findByProjectId(projectId)
                .stream()
                .map(bugTask -> modelMapper.map(bugTask, BugTaskResponseDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<BugTaskResponseDto> getBugTasksBySeverity(String severity) {
        return bugTaskRepository.findBySeverity(severity)
                .stream()
                .map(bugTask -> modelMapper.map(bugTask, BugTaskResponseDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public BugTaskResponseDto assignTaskToUser(Long taskId, Long userId) {
        BugTask bugTask = bugTaskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Bug task not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        bugTask.setAssignedTo(user);
        BugTask updatedTask = bugTaskRepository.save(bugTask);
        return modelMapper.map(updatedTask, BugTaskResponseDto.class);
    }

    @Override
    public BugTaskResponseDto changeTaskStatus(Long taskId, String statusName) {
        BugTask bugTask = bugTaskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Bug task not found"));
        TaskStatus status = taskStatusRepository.findByName(statusName)
                .orElseThrow(() -> new RuntimeException("Task status not found"));
        bugTask.setStatus(status);
        BugTask updatedTask = bugTaskRepository.save(bugTask);
        return modelMapper.map(updatedTask, BugTaskResponseDto.class);
    }
}
