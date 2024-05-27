package project.management.services;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import project.management.dto.FeatureTaskRequestDto;
import project.management.dto.FeatureTaskResponseDto;
import project.management.entities.FeatureTask;
<<<<<<< HEAD
import project.management.entities.Task;
import project.management.entities.TaskStatus;
=======
>>>>>>> 72c81df390a024e69dada95a9970d75cee42c06a
import project.management.entities.User;
import project.management.repositories.FeatureTaskRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
<<<<<<< HEAD
import project.management.repositories.TaskStatusRepository;
=======
>>>>>>> 72c81df390a024e69dada95a9970d75cee42c06a
import project.management.repositories.UserRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FeatureTaskServiceImpl implements FeatureTaskService {

    private final FeatureTaskRepository featureTaskRepository;
    private final ModelMapper modelMapper;
    private final UserRepository userRepository;
<<<<<<< HEAD
    private final TaskStatusRepository taskStatusRepository;

    @Autowired
    public FeatureTaskServiceImpl(FeatureTaskRepository featureTaskRepository, ModelMapper modelMapper, UserRepository userRepository, TaskStatusRepository taskStatusRepository) {
        this.featureTaskRepository = featureTaskRepository;
        this.modelMapper = modelMapper;
        this.userRepository = userRepository;
        this.taskStatusRepository = taskStatusRepository;
=======

    @Autowired
    public FeatureTaskServiceImpl(FeatureTaskRepository featureTaskRepository, ModelMapper modelMapper, UserRepository userRepository) {
        this.featureTaskRepository = featureTaskRepository;
        this.modelMapper = modelMapper;
        this.userRepository = userRepository;
>>>>>>> 72c81df390a024e69dada95a9970d75cee42c06a
    }

    @Override
    public FeatureTaskResponseDto addFeatureTask(FeatureTaskRequestDto featureTaskRequestDto) {
        FeatureTask featureTask = modelMapper.map(featureTaskRequestDto, FeatureTask.class);
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
    public FeatureTaskResponseDto updateFeatureTask(FeatureTaskRequestDto featureTaskRequestDto) {
        Optional<FeatureTask> featureTaskOptional = featureTaskRepository.findById(featureTaskRequestDto.getId());
        if (featureTaskOptional.isPresent()) {
            FeatureTask featureTask = modelMapper.map(featureTaskRequestDto, FeatureTask.class);
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
    public List<FeatureTaskResponseDto> getFeatureTasksByPriority(String priority) {
        return featureTaskRepository.findByPriority(priority)
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
        featureTask.setUser(user);
        FeatureTask updatedTask = featureTaskRepository.save(featureTask);
        return modelMapper.map(updatedTask, FeatureTaskResponseDto.class);
    }
<<<<<<< HEAD
    @Override
    public FeatureTaskResponseDto changeTaskStatus(Long taskId, String statusName) {
        FeatureTask featureTask = featureTaskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Feature task not found"));
        TaskStatus status = taskStatusRepository.findByName(statusName)
                .orElseThrow(() -> new RuntimeException("Task status not found"));
        featureTask.setStatus(status);
        FeatureTask updatedTask = featureTaskRepository.save(featureTask);
        return modelMapper.map(updatedTask, FeatureTaskResponseDto.class);
    }
=======
>>>>>>> 72c81df390a024e69dada95a9970d75cee42c06a
}
