package project.management.repositories;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.management.entities.OpeningHours;

@Repository
public interface OpeningHoursRepository extends JpaRepository<OpeningHours,Long> {
}