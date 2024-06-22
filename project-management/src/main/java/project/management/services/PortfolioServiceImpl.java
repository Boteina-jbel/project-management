package project.management.services;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import project.management.dto.Portfolio;
import project.management.repositories.UserRepository;

@Service
public class PortfolioServiceImpl implements PortfolioService {

    private final ProjectService projectService;
    private final FeatureTaskService featureTaskService;
    private final BugTaskService bugTaskService;

    private final UserRepository userRepository;

    public PortfolioServiceImpl(ProjectService projectService,
                                FeatureTaskService featureTaskService,
                                BugTaskService bugTaskService,
                                UserRepository userRepository) {
        this.projectService = projectService;
        this.featureTaskService = featureTaskService;
        this.bugTaskService = bugTaskService;
        this.userRepository = userRepository;
    }

    @Override
    public Portfolio getPortfolio() {
        long projectCount = projectService.countProjects();
        long featureTaskCount = featureTaskService.countFeatureTasks();
        long bugTaskCount = bugTaskService.countBugTasks();
        long adminCount = userRepository.countByProfileCode("ADMIN");
        long managerCount = userRepository.countByProfileCode("PM");
        long teamMemberCount = userRepository.countByProfileCode("TM");
        long stakeHolderCount = userRepository.countByProfileCode("SH");

        return new Portfolio(projectCount, featureTaskCount, bugTaskCount, adminCount, managerCount, teamMemberCount, stakeHolderCount);
    }
}
