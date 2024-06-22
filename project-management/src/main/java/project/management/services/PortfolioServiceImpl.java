package project.management.services;

import project.management.dto.Portfolio;
import project.management.services.PortfolioService;
import project.management.services.ProfileService;
import project.management.services.ProjectService;
import project.management.services.FeatureTaskService;
import project.management.services.BugTaskService;

public class PortfolioServiceImpl implements PortfolioService {

    private final ProfileService profileService;
    private final ProjectService projectService;
    private final FeatureTaskService featureTaskService;
    private final BugTaskService bugTaskService;

    public PortfolioServiceImpl(ProfileService profileService,
                                ProjectService projectService,
                                FeatureTaskService featureTaskService,
                                BugTaskService bugTaskService) {
        this.profileService = profileService;
        this.projectService = projectService;
        this.featureTaskService = featureTaskService;
        this.bugTaskService = bugTaskService;
    }

    @Override
    public Portfolio getPortfolio() {
        int projectCount = projectService.countProjects();
        int featureTaskCount = featureTaskService.countFeatureTasks();
        int bugTaskCount = bugTaskService.countBugTasks();
        long managerCount = profileService.countByName("Manager");
        long teamMemberCount = profileService.countByName("TeamMember");
        long stakeHolderCount = profileService.countByName("StakeHolder");

        return new Portfolio(projectCount, featureTaskCount, bugTaskCount, (int) managerCount, (int) teamMemberCount, (int) stakeHolderCount);
    }
}
