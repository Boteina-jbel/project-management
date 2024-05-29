package project.management.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import project.management.dto.ProjectRequestDto;
import project.management.dto.ProjectResponseDto;
import project.management.services.ProjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/project")
public class ProjectController {

    private ProjectService projectService;

    @Autowired
    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping("")
    public ResponseEntity<List<ProjectResponseDto>> getProject(){
        return new ResponseEntity<>(projectService.findAll(), HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<ProjectResponseDto> save(@RequestBody() ProjectRequestDto projectRequestDto){
        ProjectResponseDto projectResponseDto = projectService.save(projectRequestDto);
        return new ResponseEntity<>(projectResponseDto, HttpStatus.CREATED);
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<ProjectResponseDto> findById(@PathVariable("id") Long id) {
        ProjectResponseDto projectResponseDto = projectService.findById(id);
        return ResponseEntity.ok(projectResponseDto);
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<ProjectResponseDto> findByName(@PathVariable("name") String name) {
        ProjectResponseDto projectResponseDto = projectService.findByName(name);
        return ResponseEntity.ok(projectResponseDto);
    }

    @DeleteMapping("/id/{id}")
    public ResponseEntity<?> delete(@PathVariable() Long id) {
        projectService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/id/{id}")
    public ResponseEntity<ProjectResponseDto> update(@RequestBody() ProjectRequestDto projectRequestDto, @PathVariable() Long id) {
        ProjectResponseDto projectResponseDto = projectService.update(projectRequestDto, id);
        return ResponseEntity.accepted().body(projectResponseDto);
    }
}
