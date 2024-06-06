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

}
