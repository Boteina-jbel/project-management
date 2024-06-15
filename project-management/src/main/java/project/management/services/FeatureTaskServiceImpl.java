package project.management.services;

import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import project.management.dto.FeatureTaskRequestDto;
import project.management.dto.FeatureTaskResponseDto;
import project.management.entities.FeatureTask;
import project.management.entities.Priority;
import project.management.entities.TaskStatus;
import project.management.entities.User;
import project.management.repositories.FeatureTaskRepository;
import project.management.repositories.PriorityRepository;
import project.management.repositories.TaskStatusRepository;
import project.management.repositories.UserRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;



@Service
public class FeatureTaskServiceImpl implements FeatureTaskService {

    private final FeatureTaskRepository featureTaskRepository;
    private final ModelMapper modelMapper;
    private final UserRepository userRepository;
    private final TaskStatusRepository taskStatusRepository;
    private final PriorityRepository priorityRepository;

    public FeatureTaskServiceImpl(FeatureTaskRepository featureTaskRepository, ModelMapper modelMapper, UserRepository userRepository, TaskStatusRepository taskStatusRepository, PriorityRepository priorityRepository) {
        this.featureTaskRepository = featureTaskRepository;
        this.modelMapper = modelMapper;
        this.userRepository = userRepository;
        this.taskStatusRepository = taskStatusRepository;
        this.priorityRepository = priorityRepository;
    }

    @Override
    public FeatureTaskResponseDto addFeatureTask(FeatureTaskRequestDto featureTaskRequestDto, String username) {
        FeatureTask featureTask = modelMapper.map(featureTaskRequestDto, FeatureTask.class);
        featureTask.setCreatedBy(userRepository.findByUsername(username));
        featureTask.setCreatedAt(new Date());
        FeatureTask savedFeatureTask = featureTaskRepository.save(featureTask);
        return modelMapper.map(savedFeatureTask, FeatureTaskResponseDto.class);
    }

    @Override
    public FeatureTaskResponseDto getFeatureTaskById(Long taskId) {
        FeatureTask featureTask = featureTaskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("FeatureTask not found"));
        return modelMapper.map(featureTask, FeatureTaskResponseDto.class);
    }

    @Override
    public FeatureTaskResponseDto updateFeatureTask(Long taskId, FeatureTaskRequestDto featureTaskRequestDto) {
        Optional<FeatureTask> featureTaskOptional = featureTaskRepository.findById(taskId);
        if (featureTaskOptional.isPresent()) {
            FeatureTask featureTask = modelMapper.map(featureTaskRequestDto, FeatureTask.class);
            // Set the ID of the task to update
            featureTask.setId(featureTaskOptional.get().getId());
            featureTask.setCreatedBy(featureTaskOptional.get().getCreatedBy());
            featureTask.setCreatedAt(featureTaskOptional.get().getCreatedAt());
            FeatureTask updatedFeatureTask = featureTaskRepository.save(featureTask);
            return modelMapper.map(updatedFeatureTask, FeatureTaskResponseDto.class);
        } else {
            throw new EntityNotFoundException("FeatureTask not found");
        }
    }

    @Override
    public void deleteFeatureTask(Long taskId) {
        featureTaskRepository.deleteById(taskId);
    }

    @Override
    public List<FeatureTaskResponseDto> getFeatureTasksByProjectId(Long projectId) {
        return featureTaskRepository.findByProjectId(projectId)
                .stream()
                .map(featureTask -> modelMapper.map(featureTask, FeatureTaskResponseDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<FeatureTaskResponseDto> getFeatureTasksByPriority(String priorityCode) {
        return featureTaskRepository.findByPriorityCode(priorityCode)
                .stream()
                .map(featureTask -> modelMapper.map(featureTask, FeatureTaskResponseDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<FeatureTaskResponseDto> searchFeatureTasksByAcceptanceCriteria(String acceptanceCriteria) {
        return featureTaskRepository.findByAcceptanceCriteriaContaining(acceptanceCriteria)
                .stream()
                .map(featureTask -> modelMapper.map(featureTask, FeatureTaskResponseDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public FeatureTaskResponseDto assignTaskToUser(Long taskId, Long userId) {
        FeatureTask featureTask = featureTaskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Feature task not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        featureTask.setAssignedTo(user);
        FeatureTask updatedTask = featureTaskRepository.save(featureTask);
        return modelMapper.map(updatedTask, FeatureTaskResponseDto.class);
    }

    @Override
    public FeatureTaskResponseDto changeTaskStatus(Long taskId, Long taskStatusId) {
        FeatureTask featureTask = featureTaskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Feature task not found"));
        TaskStatus status = taskStatusRepository.findById(taskStatusId)
                .orElseThrow(() -> new RuntimeException("Task status not found"));
        featureTask.setStatus(status);
        FeatureTask updatedTask = featureTaskRepository.save(featureTask);
        return modelMapper.map(updatedTask, FeatureTaskResponseDto.class);
    }

    @Override
    public FeatureTaskResponseDto changeTaskPriority(Long taskId, Long priorityId) {
        FeatureTask featureTask = featureTaskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Feature task not found"));
        Priority priority = priorityRepository.findById(priorityId)
                .orElseThrow(() -> new RuntimeException("Task status not found"));
        featureTask.setPriority(priority);
        FeatureTask updatedTask = featureTaskRepository.save(featureTask);
        return modelMapper.map(updatedTask, FeatureTaskResponseDto.class);    }

    @Override
    public List<FeatureTaskResponseDto> findAll() {
        return featureTaskRepository.findAll()
                .stream().map(el -> modelMapper.map(el, FeatureTaskResponseDto.class))
                .collect(Collectors.toList());
    }
}
