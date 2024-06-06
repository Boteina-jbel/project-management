package project.management.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.management.entities.Priority;
import project.management.services.PriorityService;

import java.util.List;

@RestController
@RequestMapping("/priority")
public class PriorityController {


    private PriorityService priorityService;

    @Autowired
    public PriorityController(PriorityService priorityService) {
        this.priorityService = priorityService;
    }


    @PostMapping("")
    public ResponseEntity<Priority> createPriority(@RequestBody Priority priority) {
        Priority createdPriority = priorityService.save(priority);
        return ResponseEntity.status(201).body(createdPriority);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Priority> getPriorityById(@PathVariable Long id) {
        Priority priority = priorityService.findById(id);
        return ResponseEntity.ok(priority);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePriority(@PathVariable Long id) {
        priorityService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("")
    public ResponseEntity<List<Priority>> getAllPriorities() {
        List<Priority> priorities = priorityService.findAll();
        return ResponseEntity.ok(priorities);
    }

}
