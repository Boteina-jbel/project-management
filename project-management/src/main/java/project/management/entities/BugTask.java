package project.management.entities;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@DiscriminatorValue("BUG")
public class BugTask extends Task {

    @Column(name = "steps_to_reproduce")
    private String stepsToReproduce;

    private static final long serialVersionUID = 1L;
}
