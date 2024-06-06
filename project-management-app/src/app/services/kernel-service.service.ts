import { Injectable } from '@angular/core';
import { NetworkServiceService } from './network-service.service';
import { SpinnerService } from './spinner.service';
import { ConfigurationService } from './configuration.service';
import { Profile } from '../models/Profile';
import { User } from '../models/User';
import { Project } from '../models/Project';
import { FeatureTaskResponse } from '../models/FeatureTaskResponse';

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

  getFeatureTasks(): Promise<FeatureTaskResponse[]> {
    return new Promise((resolve, reject) => {
      this.networkService.get("featuretask", true).then((response: any) => {
        resolve(response);
      }, error => {
        reject(error);
      }
      );
    });
  }
}
