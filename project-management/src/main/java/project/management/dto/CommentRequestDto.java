package project.management.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import project.management.entities.Task;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentRequestDto {

    private String content;
    private Date createdAt;
    private Task task;

}
