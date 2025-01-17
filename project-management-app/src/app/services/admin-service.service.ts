import { Injectable } from '@angular/core';
import { ConfigurationService } from './configuration.service';
import { NetworkServiceService } from './network-service.service';
import { SpinnerService } from './spinner.service';
import { KernelServiceService } from './kernel-service.service';
import { UsersResponse } from '../models/UsersResponse';
import { Filter } from '../models/Filter';
import { User } from '../models/User';
import { Project } from '../models/Project';
import { FeatureTask } from '../models/FeatureTask';
import { BugTask } from '../models/BugTask';
@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(
    private configurationService: ConfigurationService,
    private networkService: NetworkServiceService,
    private spinnerService: SpinnerService,
    private kernelServiceService: KernelServiceService
  ) { }

  saveUser(user: User): Promise<User> {
    return new Promise((resolve, reject) => {
      this.networkService.post("user", user, true).then((response: any) => {
        resolve(response);
      }, error => {
        reject(error);
      }
      );
    });
  }

  getUsers(filter: Filter): Promise<UsersResponse> {
    return new Promise((resolve, reject) => {
      this.networkService.post("user/usersGet", filter, true).then((response: any) => {
        resolve(response);
      }, error => {
        reject(error);
      }
      );
    });
  }

  getByProfileCode(profileCode: string): Promise<User[]> {
    return new Promise((resolve, reject) => {
      this.networkService.get("user/profileCode/" + profileCode, true).then((response: any) => {
        resolve(response);
      }, error => {
        reject(error);
      }
      );
    });
  }

  saveProject(project: Project): Promise<Project> {
    return new Promise((resolve, reject) => {
      this.networkService.post("project", project, true).then((response: any) => {
        resolve(response);
      }, error => {
        reject(error);
      }
      );
    });
  }

  updateProject(project: Project): Promise<Project> {
    return new Promise((resolve, reject) => {
      this.networkService.put("project/id/" + project.id, project, true).then((response: any) => {
        resolve(response);
      }, error => {
        reject(error);
      }
      );
    });
  }


  deleteProject(projectId: number): Promise<Project> {
    return new Promise((resolve, reject) => {
      this.networkService.delete("project/id/" + projectId, true).then((response: any) => {
        resolve(response);
      }, error => {
        reject(error);
      }
      );
    });
  }

  saveFeatureTask(featuretask: FeatureTask): Promise<FeatureTask> {
    return new Promise((resolve, reject) => {
      this.networkService.post("feature-task", featuretask, true).then((response: any) => {
        resolve(response);
      }, error => {
        reject(error);
      }
      );
    });
  }

  updateFeatureTask(featuretask: FeatureTask): Promise<FeatureTask> {
    return new Promise((resolve, reject) => {
      this.networkService.put("feature-task/" + featuretask.id, featuretask, true).then((response: any) => {
        resolve(response);
      }, error => {
        reject(error);
      }
      );
    });
  }

  deleteFeatureTask(featuretaskId: number): Promise<FeatureTask> {
    return new Promise((resolve, reject) => {
      this.networkService.delete("feature-task/" + featuretaskId, true).then((response: any) => {
        resolve(response);
      }, error => {
        reject(error);
      }
      );
    });
  }

  saveBugTask(bugTask: BugTask): Promise<BugTask> {
    return new Promise((resolve, reject) => {
      this.networkService.post("bug-task", bugTask, true).then((response: any) => {
        resolve(response);
      }, error => {
        reject(error);
      }
      );
    });
  }

  updateBugTask(bugTask: BugTask): Promise<BugTask> {
    return new Promise((resolve, reject) => {
      this.networkService.put("bug-task/" + bugTask.id, bugTask, true).then((response: any) => {
        resolve(response);
      }, error => {
        reject(error);
      }
      );
    });
  }

  deleteBugTask(bugTaskId: number): Promise<BugTask> {
    return new Promise((resolve, reject) => {
      this.networkService.delete("bug-task/" + bugTaskId, true).then((response: any) => {
        resolve(response);
      }, error => {
        reject(error);
      }
      );
    });
  }

}
