package com.example.entities;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("FEATURE")
public class FeatureTask extends Task {

    @Column(name = "priority")
    private String priority;

    @Column(name = "acceptance_criteria")
    private String acceptanceCriteria;

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

    private static final long serialVersionUID = 1L;
}
