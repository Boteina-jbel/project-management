package project.management.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.management.entities.Endpoint;
import project.management.entities.Profile;
import project.management.entities.ProfileEndpoint;

@Repository
public interface ProfileEndpointRepository extends JpaRepository<ProfileEndpoint,Long> {
    ProfileEndpoint findByProfileAndEndpoint(Profile profile, Endpoint endpoint);
}

