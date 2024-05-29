package project.management.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.management.entities.Comment;
import project.management.entities.Endpoint;

@Repository
public interface EndpointRepository extends JpaRepository<Endpoint,Long> {

    Endpoint findByValue(String value);
}
