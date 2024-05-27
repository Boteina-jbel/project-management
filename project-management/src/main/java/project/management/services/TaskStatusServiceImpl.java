package project.management.services;

import org.springframework.stereotype.Service;
import project.management.entities.TaskStatus;
import project.management.repositories.TaskStatusRepository;

import java.util.List;

@Service
public class TaskStatusServiceImpl implements TaskStatusService {

    private final TaskStatusRepository taskStatusRepository;

    public TaskStatusServiceImpl(TaskStatusRepository taskStatusRepository) {
        this.taskStatusRepository = taskStatusRepository;
    }

    @Override
    public TaskStatus save(TaskStatus taskStatus) {
        return taskStatusRepository.save(taskStatus);
    }

    @Override
    public TaskStatus findById(Long id) {
        return taskStatusRepository.findById(id).orElseThrow(() -> new RuntimeException("TaskStatus not found"));
    }

    @Override
    public void delete(Long id) {
        taskStatusRepository.deleteById(id);
    }

    @Override
    public List<TaskStatus> findAll() {
        return taskStatusRepository.findAll();
    }
}
