package project.management.services;

import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import project.management.dto.BugTaskRequestDto;
import project.management.dto.BugTaskResponseDto;
import project.management.dto.FeatureTaskResponseDto;
import project.management.entities.*;
import project.management.repositories.BugTaskRepository;
import project.management.repositories.PriorityRepository;
import project.management.repositories.TaskStatusRepository;
import project.management.repositories.UserRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BugTaskServiceImpl implements BugTaskService {

    private final BugTaskRepository bugTaskRepository;
    private final ModelMapper modelMapper;
    private final UserRepository userRepository;
    private final TaskStatusRepository taskStatusRepository;
    private final PriorityRepository priorityRepository;

    public BugTaskServiceImpl(BugTaskRepository bugTaskRepository, ModelMapper modelMapper, UserRepository userRepository, TaskStatusRepository taskStatusRepository, PriorityRepository priorityRepository) {
        this.bugTaskRepository = bugTaskRepository;
        this.modelMapper = modelMapper;
        this.userRepository = userRepository;
        this.taskStatusRepository = taskStatusRepository;
        this.priorityRepository = priorityRepository;
    }

    @Override
    public BugTaskResponseDto addBugTask(BugTaskRequestDto bugTaskRequestDto, String username) {
        BugTask bugTask = modelMapper.map(bugTaskRequestDto, BugTask.class);
        bugTask.setCreatedBy(userRepository.findByUsername(username));
        bugTask.setCreatedAt(new Date());
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
            bugTask.setId(bugTaskOptional.get().getId());
            bugTask.setCreatedBy(bugTaskOptional.get().getCreatedBy());
            bugTask.setCreatedAt(bugTaskOptional.get().getCreatedAt());
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

    /*@Override
    public List<BugTaskResponseDto> getBugTasksBySeverity(String severity) {
        return bugTaskRepository.findBySeverity(severity)
                .stream()
                .map(bugTask -> modelMapper.map(bugTask, BugTaskResponseDto.class))
                .collect(Collectors.toList());
    }*/

    @Override
    public List<BugTaskResponseDto> getFeatureTasksByPriority(String priorityCode) {
        return bugTaskRepository.findByPriorityCode(priorityCode)
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
    public BugTaskResponseDto changeTaskStatus(Long taskId, Long taskStatusId) {
        BugTask bugTask = bugTaskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Bug task not found"));
        TaskStatus status = taskStatusRepository.findById(taskStatusId)
                .orElseThrow(() -> new RuntimeException("Task status not found"));
        bugTask.setStatus(status);
        BugTask updatedTask = bugTaskRepository.save(bugTask);
        return modelMapper.map(updatedTask, BugTaskResponseDto.class);
    }

    @Override
    public BugTaskResponseDto changeTaskPriority(Long taskId, Long priorityId) {
        BugTask bugTask  = bugTaskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Feature task not found"));
        Priority priority = priorityRepository.findById(priorityId)
                .orElseThrow(() -> new RuntimeException("Task status not found"));
        bugTask.setPriority(priority);
        BugTask updatedTask = bugTaskRepository.save(bugTask);
        return modelMapper.map(updatedTask, BugTaskResponseDto.class);
    }

    @Override
    public List<BugTaskResponseDto> findAll() {
        return bugTaskRepository.findAllByOrderByCreatedAtDesc()
                .stream().map(el -> modelMapper.map(el, BugTaskResponseDto.class))
                .collect(Collectors.toList());
    }
}
