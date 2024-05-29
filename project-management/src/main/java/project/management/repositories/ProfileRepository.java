package project.management.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.management.entities.Profile;

@Repository
public interface ProfileRepository extends JpaRepository<Profile,Long> {
}

