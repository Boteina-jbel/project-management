package project.management.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import project.management.dto.BugTaskRequestDto;
import project.management.dto.BugTaskResponseDto;
import project.management.dto.FeatureTaskResponseDto;
import project.management.services.BugTaskService;

import java.util.List;

@RestController
@RequestMapping("/bug-task")
public class BugTaskController {

    private final BugTaskService bugTaskService;

    @Autowired
    public BugTaskController(BugTaskService bugTaskService) {
        this.bugTaskService = bugTaskService;
    }

    @PostMapping("")
    public ResponseEntity<BugTaskResponseDto> addBugTask(@RequestBody BugTaskRequestDto bugTaskRequestDto, @RequestHeader(name = "username") String username) {
        BugTaskResponseDto bugTaskResponseDto = bugTaskService.addBugTask(bugTaskRequestDto, username);
        return new ResponseEntity<>(bugTaskResponseDto, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BugTaskResponseDto> getBugTaskById(@PathVariable("id") Long id) {
        BugTaskResponseDto bugTaskResponseDto = bugTaskService.getBugTaskById(id);
        return new ResponseEntity<>(bugTaskResponseDto, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BugTaskResponseDto> updateBugTask(@PathVariable("id") Long taskId, @RequestBody BugTaskRequestDto bugTaskRequestDto) {
        BugTaskResponseDto bugTaskResponseDto = bugTaskService.updateBugTask(taskId, bugTaskRequestDto);
        return new ResponseEntity<>(bugTaskResponseDto, HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBugTask(@PathVariable("id") Long id) {
        bugTaskService.deleteBugTask(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<BugTaskResponseDto>> getBugTasksByProjectId(@PathVariable("projectId") Long projectId) {
        List<BugTaskResponseDto> bugTasks = bugTaskService.getBugTasksByProjectId(projectId);
        return new ResponseEntity<>(bugTasks, HttpStatus.OK);
    }

    /*@GetMapping("/severity/{severity}")
    public ResponseEntity<List<BugTaskResponseDto>> getBugTasksBySeverity(@PathVariable("severity") String severity) {
        List<BugTaskResponseDto> bugTasks = bugTaskService.getBugTasksBySeverity(severity);
        return new ResponseEntity<>(bugTasks, HttpStatus.OK);
    }*/

    @GetMapping("/priority/{priorityCode}")
    public ResponseEntity<List<BugTaskResponseDto>> getFeatureTasksByPriority(@PathVariable("priorityCode") String priorityCode) {
        List<BugTaskResponseDto> featureTasks = bugTaskService.getFeatureTasksByPriority(priorityCode);
        return new ResponseEntity<>(featureTasks, HttpStatus.OK);
    }


    @PutMapping("/{taskId}/assign")
    public ResponseEntity<BugTaskResponseDto> assignTaskToUser(@PathVariable Long taskId, @RequestParam Long userId) {
        return ResponseEntity.ok(bugTaskService.assignTaskToUser(taskId, userId));
    }

    @PutMapping("/{taskId}/status")
    public ResponseEntity<BugTaskResponseDto> changeTaskStatus(@PathVariable Long taskId, @RequestParam String status) {
        return ResponseEntity.ok(bugTaskService.changeTaskStatus(taskId, status));
    }
}
