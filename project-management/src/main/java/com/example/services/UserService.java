package com.example.services;

import com.example.dto.UserRequestDto;
import com.example.dto.UserResponseDto;

import java.util.List;

public interface UserService {

    UserResponseDto save(UserRequestDto userRequestDto);

    UserResponseDto findById(Long id);

    UserResponseDto findByUsername(String username);

    void delete(Long id);

    UserResponseDto update(UserRequestDto userRequestDto, Long id);

    List<UserResponseDto> findAll();

}
