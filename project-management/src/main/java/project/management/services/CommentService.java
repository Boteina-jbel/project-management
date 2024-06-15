package project.management.services;

import java.util.List;

import project.management.dto.CommentRequestDto;
import project.management.dto.CommentResponseDto;

public interface CommentService {

    CommentResponseDto save(CommentRequestDto commentRequestDto, String username);

    CommentResponseDto findById(Long id);

    List<CommentResponseDto> findByTaskId(Long taskId);

    void delete(Long id);

    CommentResponseDto update(CommentRequestDto commentRequestDto, Long id);

    List<CommentResponseDto> findAll();

}
