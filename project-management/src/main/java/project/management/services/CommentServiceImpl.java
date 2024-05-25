package project.management.services;

import jakarta.persistence.EntityNotFoundException;
import project.management.dto.CommentRequestDto;
import project.management.dto.CommentResponseDto;
import project.management.entities.Comment;
import project.management.repositories.CommentRepository;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final ModelMapper modelMapper;

    public CommentServiceImpl(CommentRepository commentRepository, ModelMapper modelMapper) {
        this.commentRepository = commentRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public CommentResponseDto save(CommentRequestDto commentRequestDto) {
        Comment comment = modelMapper.map(commentRequestDto, Comment.class);
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
