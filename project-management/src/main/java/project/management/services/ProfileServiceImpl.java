package project.management.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.management.entities.Profile;
import project.management.repositories.ProfileRepository;

import java.util.List;

@Service
public class ProfileServiceImpl implements ProfileService {

    private final ProfileRepository profileRepository;

    @Autowired
    public ProfileServiceImpl(ProfileRepository profileRepository){
        this.profileRepository = profileRepository;
    }
    @Override
    public List<Profile> findAll() {
        return profileRepository.findAll();
    }

    @Override
    public long countByCode(String code) {
        return profileRepository.countByCode(code);
    }
}

