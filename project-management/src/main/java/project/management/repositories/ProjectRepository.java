package project.management.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import project.management.entities.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project,Long> {
    Project findByName(String name);
}
