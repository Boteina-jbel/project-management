package project.management.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.management.entities.BugTask;
import project.management.entities.FeatureTask;

import java.util.List;

@Repository
public interface BugTaskRepository extends JpaRepository<BugTask, Long> {
    List<BugTask> findByProjectId(Long projectId);
    //List<BugTask> findBySeverity(String severity);
    List<BugTask> findByPriorityCode(String priorityCode);
    List<BugTask> findByAssignedToId(Long userId);
    List<BugTask> findAllByOrderByCreatedAtDesc();

}
