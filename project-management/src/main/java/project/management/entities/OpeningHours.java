package project.management.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class OpeningHours {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "code")
    private String code;

    @Column(name = "name")
    private String name;

    // Monday
    @Column(name = "opening_time_am_1", nullable=false)
    private String openingTimeAm1;

    @Column(name = "closing_time_am_1", nullable=false)
    private String closingTimeAm1;

    @Column(name = "opening_time_pm_1", nullable=false)
    private String openingTimePm1;

    @Column(name = "closing_time_pm_1", nullable=false)
    private String closingTimePm1;

    // Tuesday
    @Column(name = "opening_time_am_2", nullable=false)
    private String openingTimeAm2;

    @Column(name = "closing_time_am_2", nullable=false)
    private String closingTimeAm2;

    @Column(name = "opening_time_pm_2", nullable=false)
    private String openingTimePm2;

    @Column(name = "closing_time_pm_2", nullable=false)
    private String closingTimePm2;

    // Wednesday
    @Column(name = "opening_time_am_3", nullable=false)
    private String openingTimeAm3;

    @Column(name = "closing_time_am_3", nullable=false)
    private String closingTimeAm3;

    @Column(name = "opening_time_pm_3", nullable=false)
    private String openingTimePm3;

    @Column(name = "closing_time_pm_3", nullable=false)
    private String closingTimePm3;

    // Thursday
    @Column(name = "opening_time_am_4", nullable=false)
    private String openingTimeAm4;

    @Column(name = "closing_time_am_4", nullable=false)
    private String closingTimeAm4;

    @Column(name = "opening_time_pm_4", nullable=false)
    private String openingTimePm4;

    @Column(name = "closing_time_pm_4", nullable=false)
    private String closingTimePm4;

    // Friday
    @Column(name = "opening_time_am_5", nullable=false)
    private String openingTimeAm5;

    @Column(name = "closing_time_am_5", nullable=false)
    private String closingTimeAm5;

    @Column(name = "opening_time_pm_5", nullable=false)
    private String openingTimePm5;

    @Column(name = "closing_time_pm_5", nullable=false)
    private String closingTimePm5;

    // Saturday
    @Column(name = "opening_time_am_6", nullable=false)
    private String openingTimeAm6;

    @Column(name = "closing_time_am_6", nullable=false)
    private String closingTimeAm6;

    @Column(name = "opening_time_pm_6", nullable=false)
    private String openingTimePm6;

    @Column(name = "closing_time_pm_6", nullable=false)
    private String closingTimePm6;

    // Sunday
    @Column(name = "opening_time_am_7", nullable=false)
    private String openingTimeAm7;

    @Column(name = "closing_time_am_7", nullable=false)
    private String closingTimeAm7;

    @Column(name = "opening_time_pm_7", nullable=false)
    private String openingTimePm7;

    @Column(name = "closing_time_pm_7", nullable=false)
    private String closingTimePm7;
}
