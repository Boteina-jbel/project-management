package project.management.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.management.entities.TaskStatus;
import project.management.services.TaskStatusService;

import java.util.List;

@RestController
@RequestMapping("/task-statuses")
public class TaskStatusController {

    private final TaskStatusService taskStatusService;

    public TaskStatusController(TaskStatusService taskStatusService) {
        this.taskStatusService = taskStatusService;
    }

    @PostMapping("")
    public ResponseEntity<TaskStatus> createTaskStatus(@RequestBody TaskStatus taskStatus) {
        TaskStatus createdStatus = taskStatusService.save(taskStatus);
        return ResponseEntity.status(201).body(createdStatus);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskStatus> getTaskStatusById(@PathVariable Long id) {
        TaskStatus taskStatus = taskStatusService.findById(id);
        return ResponseEntity.ok(taskStatus);
    }

    @GetMapping("")
    public ResponseEntity<List<TaskStatus>> getAllTaskStatuses() {
        List<TaskStatus> statuses = taskStatusService.findAll();
        return ResponseEntity.ok(statuses);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTaskStatus(@PathVariable Long id) {
        taskStatusService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
