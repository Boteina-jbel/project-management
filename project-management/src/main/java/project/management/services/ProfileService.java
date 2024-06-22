package project.management.services;


import project.management.entities.Profile;

import java.util.List;

public interface ProfileService {

    List<Profile> findAll();

    long countByCode(String code);
}
