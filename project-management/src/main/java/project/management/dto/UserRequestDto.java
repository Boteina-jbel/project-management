package project.management.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import project.management.entities.Profile;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRequestDto {

    private Long id;
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String password;
    private String thumbnail;
    private Profile profile;
    private String token;
}
