package project.management.entities;

import jakarta.persistence.*;

@Entity
@DiscriminatorValue("FEATURE")
public class FeatureTask extends Task {

    @Column(name = "priority")
    private String priority;

    @Column(name = "acceptance_criteria")
    private String acceptanceCriteria;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getAcceptanceCriteria() {
        return acceptanceCriteria;
    }

    public void setAcceptanceCriteria(String acceptanceCriteria) {
        this.acceptanceCriteria = acceptanceCriteria;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    private static final long serialVersionUID = 1L;
}
