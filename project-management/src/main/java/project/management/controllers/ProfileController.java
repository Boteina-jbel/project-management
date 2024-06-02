package project.management.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.management.entities.Profile;
import project.management.services.ProfileService;

import java.util.List;

@RestController
@RequestMapping("/profile")
public class ProfileController {

    private ProfileService profileService;

    @Autowired
    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping("")
    public ResponseEntity<List<Profile>> getProject(){
        return new ResponseEntity<>(profileService.findAll(), HttpStatus.OK);
    }

}
