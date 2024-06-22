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
    private long bugTaskCount;
    private long adminCount;
    private long managerCount;
    private long teamMemberCount;
    private long stakeHolderCount;

}
