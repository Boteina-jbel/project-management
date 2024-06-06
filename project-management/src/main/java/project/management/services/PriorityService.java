package project.management.services;

import project.management.entities.Priority;
import project.management.entities.TaskStatus;

import java.util.List;

public interface PriorityService {

    Priority save(Priority priority);
    Priority findById(Long id);
    void delete(Long id);
    List<Priority> findAll();

}
