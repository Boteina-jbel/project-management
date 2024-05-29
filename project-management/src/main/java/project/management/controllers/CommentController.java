package project.management.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.management.dto.CommentRequestDto;
import project.management.dto.CommentResponseDto;
import project.management.services.CommentService;

import java.util.List;

@RestController
@RequestMapping("/comment")
public class CommentController {

    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping("")
    public ResponseEntity<CommentResponseDto> addComment(@RequestBody CommentRequestDto commentRequestDto) {
        CommentResponseDto addedComment = commentService.save(commentRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(addedComment);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CommentResponseDto> getCommentById(@PathVariable Long id) {
        CommentResponseDto comment = commentService.findById(id);
        return ResponseEntity.ok(comment);
    }

    @GetMapping("/task/{taskId}")
    public ResponseEntity<List<CommentResponseDto>> getCommentsByTaskId(@PathVariable Long taskId) {
        List<CommentResponseDto> comments = commentService.findByTaskId(taskId);
        return ResponseEntity.ok(comments);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long id) {
        commentService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<CommentResponseDto> updateComment(@PathVariable Long id, @RequestBody CommentRequestDto commentRequestDto) {
        CommentResponseDto updatedComment = commentService.update(commentRequestDto, id);
        return ResponseEntity.ok(updatedComment);
    }

    @GetMapping("")
    public ResponseEntity<List<CommentResponseDto>> getAllComments() {
        List<CommentResponseDto> comments = commentService.findAll();
        return ResponseEntity.ok(comments);
    }
}
