package project.management.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Portfolio {

    private Integer projectCount;
    private Integer featureTaskCount;
    private Integer BugTaskCount;
    private Integer ManagerCount;
    private Integer TeamMemberCount;
    private Integer StakeHolderCount;

}
