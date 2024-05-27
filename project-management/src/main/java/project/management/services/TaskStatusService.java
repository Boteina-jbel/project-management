package project.management.services;

import project.management.entities.TaskStatus;
import java.util.List;

public interface TaskStatusService {
    TaskStatus save(TaskStatus taskStatus);
    TaskStatus findById(Long id);
    void delete(Long id);
    List<TaskStatus> findAll();
}
