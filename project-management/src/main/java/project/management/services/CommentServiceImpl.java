package project.management.services;

import jakarta.persistence.EntityNotFoundException;
import project.management.dto.CommentRequestDto;
import project.management.dto.CommentResponseDto;
import project.management.entities.Comment;
import project.management.repositories.CommentRepository;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import project.management.repositories.UserRepository;
import project.management.utils.ErrorCode;
import project.management.utils.ProjectManagementException;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final ModelMapper modelMapper;

    private final UserRepository userRepository;

    public CommentServiceImpl(CommentRepository commentRepository, ModelMapper modelMapper, UserRepository userRepository) {
        this.commentRepository = commentRepository;
        this.modelMapper = modelMapper;
        this.userRepository = userRepository;
    }

    @Override
    public CommentResponseDto save(CommentRequestDto commentRequestDto, String username) {
        Comment comment = modelMapper.map(commentRequestDto, Comment.class);
        if(comment.getTask() != null || comment.getTask().getId() != null) throw new ProjectManagementException(ErrorCode.comment_task_null, "Comment task can't be null");
        comment.setAuthor(userRepository.findByUsername(username));
        comment.setCreatedAt(new Date());
        Comment saved = commentRepository.save(comment);
        return modelMapper.map(saved, CommentResponseDto.class);
    }

    @Override
    public CommentResponseDto findById(Long id) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Comment not found"));
        return modelMapper.map(comment, CommentResponseDto.class);
    }

    @Override
    public List<CommentResponseDto> findByTaskId(Long taskId) {
        List<Comment> comments = commentRepository.findByTaskId(taskId);
        return comments.stream()
                .map(comment -> modelMapper.map(comment, CommentResponseDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public void delete(Long id) {
        commentRepository.deleteById(id);
    }

    @Override
    public CommentResponseDto update(CommentRequestDto commentRequestDto, Long id) {
        Optional<Comment> commentOptional = commentRepository.findById(id);
        if (commentOptional.isPresent()) {
            Comment comment = modelMapper.map(commentRequestDto, Comment.class);
            comment.setId(id);
            Comment updated = commentRepository.save(comment);
            return modelMapper.map(updated, CommentResponseDto.class);
        } else {
            throw new EntityNotFoundException("Comment not found");
        }
    }

    @Override
    public List<CommentResponseDto> findAll() {
        return commentRepository.findAll()
                .stream()
                .map(comment -> modelMapper.map(comment, CommentResponseDto.class))
                .collect(Collectors.toList());
    }
}
