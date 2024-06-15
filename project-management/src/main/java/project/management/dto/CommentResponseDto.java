package project.management.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import project.management.entities.User;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentResponseDto {

    private Long id;
    private String content;
    private Date createdAt;
    private User author;
    private Long taskId;
}
