package project.management.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.management.entities.Priority;

@Repository
public interface PriorityRepository extends JpaRepository<Priority,Long> {

}