package project.management.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import project.management.entities.Profile;
import project.management.entities.ProfileEndpoint;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDto {

    private Long id;
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String thumbnail;
    private String token;
    private Profile profile;
    private List<ProfileEndpoint> profileEndpoints;
}
