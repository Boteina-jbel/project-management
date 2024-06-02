package project.management.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "endpoint", uniqueConstraints = @UniqueConstraint(columnNames = {"method", "value"}))
public class Endpoint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "value", nullable = false)
    private String value;

    @Column(name = "method", nullable = false)
    private String method;

    @Column(name = "hold", nullable = false)
    private Boolean hold = false;

}
