package project.management.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Portfolio {

    private long projectCount;
    private long featureTaskCount;
    private long BugTaskCount;
    private long adminCount;
    private long ManagerCount;
    private long TeamMemberCount;
    private long StakeHolderCount;

}
