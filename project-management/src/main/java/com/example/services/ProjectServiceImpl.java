package com.example.services;

import com.example.dto.ProjectRequestDto;
import com.example.dto.ProjectResponseDto;
import com.example.entities.Project;
import com.example.repositories.ProjectRepository;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProjectServiceImpl implements ProjectService{

    private ProjectRepository projectRepository;
    private ModelMapper modelMapper;

    public ProjectServiceImpl(ProjectRepository projectRepository, ModelMapper modelMapper) {
        this.projectRepository = projectRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public ProjectResponseDto save(ProjectRequestDto projectRequestDto) {
        Project project = modelMapper.map(projectRequestDto, Project.class);
        Project saved = projectRepository.save(project);
        return modelMapper.map(saved, ProjectResponseDto.class);
    }

    @Override
    public ProjectResponseDto findById(Long id) {
        Project project = projectRepository.findById(id).orElseThrow(() -> new RuntimeException("Project not found"));
        return modelMapper.map(project, ProjectResponseDto.class);
    }

    @Override
    public ProjectResponseDto findByName(String name) {
        Project project = projectRepository.findByName(name);
        return modelMapper.map(project, ProjectResponseDto.class);
    }

    @Override
    public void delete(Long id) {
        projectRepository.deleteById(id);
    }

    @Override
    public ProjectResponseDto update(ProjectRequestDto projectRequestDto, Long id) {
        Optional<Project> projectOptional = projectRepository.findById(id);
        if (projectOptional.isPresent()){
            Project project = modelMapper.map(projectRequestDto, Project.class);
            project.setId(id);
            Project updated = projectRepository.save(project);
            return modelMapper.map(updated, ProjectResponseDto.class);
        } else {
            throw new EntityNotFoundException("Project not found");
        }
    }

    @Override
    public List<ProjectResponseDto> findAll() {
        return projectRepository.findAll()
                .stream().map(el -> modelMapper.map(el, ProjectResponseDto.class))
                .collect(Collectors.toList());
    }
}
