package com.example.services;

import com.example.dto.ProjectRequestDto;
import com.example.dto.ProjectResponseDto;

import java.util.List;

public interface ProjectService {

    ProjectResponseDto save(ProjectRequestDto projectRequestDto);

    ProjectResponseDto findById(Long id);

    ProjectResponseDto findByName(String name);

    void delete(Long id);

    ProjectResponseDto update(ProjectRequestDto projectRequestDto, Long id);

    List<ProjectResponseDto> findAll();

}
