package project.management.services;

import java.util.List;

import project.management.dto.ProjectRequestDto;
import project.management.dto.ProjectResponseDto;

public interface ProjectService {

    ProjectResponseDto save(ProjectRequestDto projectRequestDto, String username);

    ProjectResponseDto findById(Long id);

    ProjectResponseDto findByName(String name);

    void delete(Long id);

    ProjectResponseDto update(ProjectRequestDto projectRequestDto, Long id);

    List<ProjectResponseDto> findAll();

    int countProjects();

}
