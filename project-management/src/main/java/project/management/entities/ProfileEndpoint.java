package project.management.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class ProfileEndpoint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "profile_id")
    private Profile profile;

    @ManyToOne
    @JoinColumn(name = "endpoint_id")
    private Endpoint endpoint;

    @Column(name = "hold", nullable = false)
    private Boolean hold = false;

}
