package project.management.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.management.entities.FeatureTask;

import java.util.List;

@Repository
public interface FeatureTaskRepository extends JpaRepository<FeatureTask, Long> {
    List<FeatureTask> findByProjectId(Long projectId);
    List<FeatureTask> findByPriority(String priority);
    List<FeatureTask> findByAcceptanceCriteriaContaining(String acceptanceCriteria);
}
