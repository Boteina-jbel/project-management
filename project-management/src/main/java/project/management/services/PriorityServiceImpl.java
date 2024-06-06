package project.management.services;

import org.springframework.stereotype.Service;
import project.management.entities.Priority;
import project.management.entities.TaskStatus;
import project.management.repositories.PriorityRepository;
import project.management.repositories.ProfileEndpointRepository;

import java.util.List;

@Service
public class PriorityServiceImpl implements PriorityService {

    private final PriorityRepository priorityRepository;

    public PriorityServiceImpl(PriorityRepository priorityRepository){
        this.priorityRepository = priorityRepository;
    }

    @Override
    public Priority save(Priority priority) {
        return priorityRepository.save(priority);
    }

    @Override
    public Priority findById(Long id) {
        return priorityRepository.findById(id).orElseThrow(() -> new RuntimeException("Priority not found"));
    }

    @Override
    public void delete(Long id) {
        priorityRepository.deleteById(id);
    }

    @Override
    public List<Priority> findAll() {
        return priorityRepository.findAll();
    }
}
