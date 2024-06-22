package project.management.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import project.management.dto.UserResponseDto;
import project.management.entities.Profile;
import project.management.entities.User;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    User findByUsername(String username);
    List<User> findByUsernameContaining(String username);

    List<User> findByProfileCode(String profileCode);

    long countByProfileCode(String profileCode);

    @Query("SELECT new project.management.dto.UserResponseDto(u.firstName, u.lastName, u.username, u.email, u.thumbnail, u.profile)" +
            "FROM User u " +
            "INNER JOIN u.profile pr " +
            "WHERE (:username IS NULL OR u.username LIKE %:username%) AND " +
            "(:firstName IS NULL OR u.firstName LIKE %:firstName%) AND " +
            "(:lastName IS NULL OR u.lastName LIKE %:lastName%) AND " +
            "(:profileCode IS NULL OR pr.code = :profileCode)")
    Page<UserResponseDto> findByFilter(
            @Param("username") String username,
            @Param("firstName") String firstName,
            @Param("lastName") String lastName,
            @Param("profileCode") String profileCode,
            Pageable pageable
    );
}
