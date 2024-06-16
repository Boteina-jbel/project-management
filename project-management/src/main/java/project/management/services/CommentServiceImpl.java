package project.management.services;

import jakarta.persistence.EntityNotFoundException;
import project.management.dto.CommentRequestDto;
import project.management.dto.CommentResponseDto;
import project.management.entities.Comment;
import project.management.entities.User;
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
        if(comment.getContent() == null || "".equals(comment.getContent())) throw new ProjectManagementException(ErrorCode.commentcant_be_blank, "The content can't be blank");
        if(comment.getTask() == null || comment.getTask().getId() == null) throw new ProjectManagementException(ErrorCode.comment_task_null, "Comment task can't be null");
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
    public void delete(Long id, String username) {
        User author = userRepository.findByUsername(username);
        Optional<Comment> comment = commentRepository.findById(id);
        if (! comment.isPresent()) throw new EntityNotFoundException("Comment not found");
        if(! comment.get().getAuthor().getId().equals(author.getId())) throw new ProjectManagementException(ErrorCode.unauthorized_action, "This comment can only be deleted by the author");
        commentRepository.deleteById(id);
    }

    @Override
    public CommentResponseDto update(CommentRequestDto commentRequestDto, Long id, String username) {
        User author = userRepository.findByUsername(username);

        Optional<Comment> commentOptional = commentRepository.findById(id);
        if (commentOptional.isPresent()) {
            Comment commentDB = commentOptional.get();
            Comment comment = modelMapper.map(commentRequestDto, Comment.class);
            if(! commentDB.getAuthor().getId().equals(author.getId())) throw new ProjectManagementException(ErrorCode.unauthorized_action, "This comment can only be updated by the author");
            if(comment.getContent() == null || "".equals(comment.getContent())) throw new ProjectManagementException(ErrorCode.commentcant_be_blank, "The content can't be blank");
            commentDB.setContent(comment.getContent());
            Comment updated = commentRepository.save(commentDB);
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
