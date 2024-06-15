import { Injectable } from '@angular/core';
import { NetworkServiceService } from './network-service.service';
import { SpinnerService } from './spinner.service';
import { ConfigurationService } from './configuration.service';
import { Profile } from '../models/Profile';
import { User } from '../models/User';
import { Project } from '../models/Project';
import { FeatureTask } from '../models/FeatureTask';
import { TaskStatus } from '../models/TaskStatus';
import { Priority } from '../models/Priority';
import { BugTask } from '../models/BugTask';
import { Comment } from '../models/Comment';

@Injectable({
  providedIn: 'root'
})
export class KernelServiceService {

  constructor(
    private configurationService  : ConfigurationService,
    private networkService        : NetworkServiceService,
    private spinnerService        : SpinnerService,
  ) {}

  getProfiles(): Promise<Profile[]>{
    return new Promise((resolve, reject) => {
      this.networkService.get("profile" , false).then((response: any) => {
          resolve(response);
      }, error => {
          reject(error);
      }
      );
    });
  }

  getUserByUsername(username: string): Promise<User>{
    return new Promise((resolve, reject) => {
      this.networkService.get("user/username/" +  username, false).then((response: any) => {
          resolve(response);
      }, error => {
          reject(error);
      }
      );
    });
  }
  
  getProjects(): Promise<Project[]> {
    return new Promise((resolve, reject) => {
      this.networkService.get("project", true).then((response: any) => {
        resolve(response);
      }, error => {
        reject(error);
      }
      );
    });
  }

  getFeatureTasks(): Promise<FeatureTask[]> {
    return new Promise((resolve, reject) => {
      this.networkService.get("feature-task", true).then((response: any) => {
        resolve(response);
      }, error => {
        reject(error);
      }
      );
    });
  }

  getFeatureTask(id: number): Promise<FeatureTask> {
    return new Promise((resolve, reject) => {
      this.networkService.get("feature-task/" + id, true).then((response: any) => {
        resolve(response);
      }, error => {
        reject(error);
      }
      );
    });
  }

  getBugTasks(): Promise<BugTask[]> {
    return new Promise((resolve, reject) => {
      this.networkService.get("bug-task", true).then((response: any) => {
        resolve(response);
      }, error => {
        reject(error);
      }
      );
    });
  }

  getBugTask(id: number): Promise<BugTask> {
    return new Promise((resolve, reject) => {
      this.networkService.get("bug-task/" + id, true).then((response: any) => {
        resolve(response);
      }, error => {
        reject(error);
      }
      );
    });
  }

  getTaskStatuses(): Promise<TaskStatus[]> {
    return new Promise((resolve, reject) => {
      this.networkService.get("task-statuses", true).then((response: any) => {
        resolve(response);
      }, error => {
        reject(error);
      }
      );
    });
  }

  getPriorities(): Promise<Priority[]> {
    return new Promise((resolve, reject) => {
      this.networkService.get("priority", true).then((response: any) => {
        resolve(response);
      }, error => {
        reject(error);
      }
      );
    });
  }


  assignTaskToUser(taskId: number, userId: number): Promise<FeatureTask> {
    return new Promise((resolve, reject) => {
      this.networkService.put(`feature-task/${taskId}/assign?userId=${userId}`, null, true).then((response: any) => {
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    });
  }

  
  changeTaskStatus(taskId: number, taskStatusId: number): Promise<FeatureTask> {
    return new Promise((resolve, reject) => {
      this.networkService.put(`feature-task/${taskId}/status?taskStatusId=${taskStatusId}`, null, true).then((response: any) => {
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    });
  }
  
  changeTaskPriority(taskId: number, priorityId: number): Promise<FeatureTask> {
    return new Promise((resolve, reject) => {
      this.networkService.put(`feature-task/${taskId}/priority?priorityId=${priorityId}`, null, true).then((response: any) => {
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    });
  }
  
  getComments(taskId: number) : Promise<Comment[]> {
    return new Promise((resolve, reject) => {
      this.networkService.get(`comment/task/${taskId}`, true).then((response: any) => {
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    });
  }

  addCommment(comment: Comment): Promise<Comment> {
    return new Promise((resolve, reject) => {
      this.networkService.post(`comment`, comment, true).then((response: any) => {
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    });
  }

  saveCommment(comment: Comment): Promise<Comment> {
    return new Promise((resolve, reject) => {
      this.networkService.put(`comment//${comment.id}`, comment, true).then((response: any) => {
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    });
  }

  deleteCommment(commentId: number): Promise<Comment> {
    return new Promise((resolve, reject) => {
      this.networkService.delete(`comment/${commentId}`, true).then((response: any) => {
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    });
  }
}
