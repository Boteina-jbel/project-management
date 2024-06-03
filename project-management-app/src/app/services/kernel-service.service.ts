import { Injectable } from '@angular/core';
import { NetworkServiceService } from './network-service.service';
import { SpinnerService } from './spinner.service';
import { ConfigurationService } from './configuration.service';
import { Profile } from '../models/Profile';
import { User } from '../models/User';

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

}
