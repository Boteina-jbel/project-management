package project.management.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.management.entities.BugTask;
import project.management.entities.FeatureTask;

import java.util.List;

@Repository
public interface FeatureTaskRepository extends JpaRepository<FeatureTask, Long> {
    List<FeatureTask> findByProjectId(Long projectId);
    List<FeatureTask> findByAssignedToId(Long userId);
    List<FeatureTask> findByPriorityCode(String priorityCode);
    List<FeatureTask> findByAcceptanceCriteriaContaining(String acceptanceCriteria);

    List<FeatureTask> findAllByOrderByCreatedAtDesc();

}
