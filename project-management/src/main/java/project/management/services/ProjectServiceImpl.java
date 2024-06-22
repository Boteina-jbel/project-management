package project.management.services;

import jakarta.persistence.EntityNotFoundException;
import project.management.dto.ProjectRequestDto;
import project.management.dto.ProjectResponseDto;
import project.management.entities.Project;
import project.management.repositories.ProjectRepository;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import project.management.repositories.UserRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProjectServiceImpl implements ProjectService{

    private ProjectRepository projectRepository;
    private ModelMapper modelMapper;
    private UserRepository userRepository;
    private final List<String> projects;

    public ProjectServiceImpl(ProjectRepository projectRepository, ModelMapper modelMapper, UserRepository userRepository, List<String> projects) {
        this.projectRepository = projectRepository;
        this.modelMapper = modelMapper;
        this.userRepository = userRepository;
        this.projects = projects;
    }

    @Override
    public ProjectResponseDto save(ProjectRequestDto projectRequestDto, String username) {
        Project project = modelMapper.map(projectRequestDto, Project.class);
        project.setCreatedBy(userRepository.findByUsername(username));
        project.setCreatedAt(new Date());
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
            project.setCreatedBy(projectOptional.get().getCreatedBy());
            project.setCreatedAt(projectOptional.get().getCreatedAt());
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

    @Override
    public int countProjects() {
        return projects.size();
    }
}
