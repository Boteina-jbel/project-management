package project.management.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentRequestDto {

    private String content;
    private Date createdAt;
    private Long authorId;
    private Long taskId;
}
