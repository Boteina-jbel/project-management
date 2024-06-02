package project.management.services;

import java.util.List;

import org.springframework.data.domain.Page;
import project.management.dto.Filter;
import project.management.dto.UserRequestDto;
import project.management.dto.UserResponseDto;

public interface UserService {

    UserResponseDto save(UserRequestDto userRequestDto);

    UserResponseDto authenticate(UserRequestDto userRequestDto);

    void burnToken(UserRequestDto userRequestDto);

    UserResponseDto findById(Long id);

    UserResponseDto findByUsername(String username);

    void delete(Long id);

    UserResponseDto update(UserRequestDto userRequestDto, Long id);

    List<UserResponseDto> findAll();
    Page<UserResponseDto> findAll(Filter filter);

}
