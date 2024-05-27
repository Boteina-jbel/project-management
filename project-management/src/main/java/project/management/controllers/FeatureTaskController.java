package project.management.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import project.management.dto.FeatureTaskRequestDto;
import project.management.dto.FeatureTaskResponseDto;
import project.management.services.FeatureTaskService;

import java.util.List;

@RestController
@RequestMapping("/feature-task")
public class FeatureTaskController {

    private final FeatureTaskService featureTaskService;

    public FeatureTaskController(FeatureTaskService featureTaskService) {
        this.featureTaskService = featureTaskService;
    }

    @PostMapping("")
    public ResponseEntity<FeatureTaskResponseDto> addFeatureTask(@RequestBody FeatureTaskRequestDto featureTaskRequestDto) {
        FeatureTaskResponseDto featureTaskResponseDto = featureTaskService.addFeatureTask(featureTaskRequestDto);
        return new ResponseEntity<>(featureTaskResponseDto, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FeatureTaskResponseDto> getFeatureTaskById(@PathVariable("id") Long id) {
        FeatureTaskResponseDto featureTaskResponseDto = featureTaskService.getFeatureTaskById(id);
        return new ResponseEntity<>(featureTaskResponseDto, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FeatureTaskResponseDto> updateFeatureTask(@PathVariable("id") Long id, @RequestBody FeatureTaskRequestDto featureTaskRequestDto) {
        FeatureTaskResponseDto featureTaskResponseDto = featureTaskService.updateFeatureTask(featureTaskRequestDto);
        return new ResponseEntity<>(featureTaskResponseDto, HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFeatureTask(@PathVariable("id") Long id) {
        featureTaskService.deleteFeatureTask(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<FeatureTaskResponseDto>> getFeatureTasksByProjectId(@PathVariable("projectId") Long projectId) {
        List<FeatureTaskResponseDto> featureTasks = featureTaskService.getFeatureTasksByProjectId(projectId);
        return new ResponseEntity<>(featureTasks, HttpStatus.OK);
    }

    @GetMapping("/priority/{priority}")
    public ResponseEntity<List<FeatureTaskResponseDto>> getFeatureTasksByPriority(@PathVariable("priority") String priority) {
        List<FeatureTaskResponseDto> featureTasks = featureTaskService.getFeatureTasksByPriority(priority);
        return new ResponseEntity<>(featureTasks, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<List<FeatureTaskResponseDto>> searchFeatureTasksByAcceptanceCriteria(@RequestParam("acceptanceCriteria") String acceptanceCriteria) {
        List<FeatureTaskResponseDto> featureTasks = featureTaskService.searchFeatureTasksByAcceptanceCriteria(acceptanceCriteria);
        return new ResponseEntity<>(featureTasks, HttpStatus.OK);
    }
<<<<<<< HEAD

    @PutMapping("/{taskId}/assign")
    public ResponseEntity<FeatureTaskResponseDto> assignTaskToUser(@PathVariable Long taskId, @RequestParam Long userId) {
        return ResponseEntity.ok(featureTaskService.assignTaskToUser(taskId, userId));
    }

    @PutMapping("/{taskId}/status")
    public ResponseEntity<FeatureTaskResponseDto> changeTaskStatus(@PathVariable Long taskId, @RequestParam String status) {
        return ResponseEntity.ok(featureTaskService.changeTaskStatus(taskId, status));
    }
=======
>>>>>>> 72c81df390a024e69dada95a9970d75cee42c06a
}
