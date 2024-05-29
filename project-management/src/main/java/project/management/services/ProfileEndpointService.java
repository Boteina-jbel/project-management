package project.management.services;

import org.springframework.stereotype.Service;
import project.management.entities.Endpoint;
import project.management.entities.Profile;

public interface ProfileEndpointService {

   void checkProfileEndpointGranted(Profile profile, Endpoint endpoint);
}
