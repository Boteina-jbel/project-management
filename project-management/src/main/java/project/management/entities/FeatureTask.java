package project.management.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@DiscriminatorValue("FEATURE")
public class FeatureTask extends Task {

    @Column(name = "acceptance_criteria")
    private String acceptanceCriteria;

    private static final long serialVersionUID = 1L;
}
