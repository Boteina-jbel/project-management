package project.management.services;

import org.springframework.stereotype.Service;
import project.management.entities.Endpoint;
import project.management.entities.Profile;
import project.management.entities.ProfileEndpoint;
import project.management.repositories.ProfileEndpointRepository;
import project.management.utils.ErrorCode;
import project.management.utils.ProjectManagementException;

@Service
public class ProfileEndpointServiceImpl implements ProfileEndpointService {

    private final ProfileEndpointRepository profileEndpointRepository;

    public ProfileEndpointServiceImpl(ProfileEndpointRepository profileEndpointRepository){
        this.profileEndpointRepository = profileEndpointRepository;
    }

    @Override
    public void checkProfileEndpointGranted(Profile profile, Endpoint endpoint) {
        if(! profile.getHold()) throw new ProjectManagementException(ErrorCode.profile_blocked, "Profile blocked => " + profile.getName());
        if(! endpoint.getHold()) throw new ProjectManagementException(ErrorCode.endpoint_blocked, "Endpoint blocked => " + endpoint.getValue());

        ProfileEndpoint profileEndpoint = profileEndpointRepository.findByProfileAndEndpoint(profile, endpoint);
        if(! profileEndpoint.getHold()) throw new ProjectManagementException(ErrorCode.profile_endpoint_blocked, "Profile Endpoint blocked => " + profile.getName() + " " + endpoint.getValue());
    }
}
