import { Injectable } from '@angular/core';
import { ConfigurationService } from './configuration.service';
import { NetworkServiceService } from './network-service.service';
import { SpinnerService } from './spinner.service';
import { KernelServiceService } from './kernel-service.service';
import { UsersResponse } from '../models/UsersResponse';
import { Filter } from '../models/Filter';
import { User } from '../models/User';
@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(
    private configurationService  : ConfigurationService,
    private networkService        : NetworkServiceService,
    private spinnerService        : SpinnerService,
    private kernelServiceService : KernelServiceService
  ) {}

  saveUser(user: User) : Promise<User>{
    return new Promise((resolve, reject) => {
        this.networkService.post("user", user, true).then((response: any) => {
            resolve(response);
        }, error => {
            reject(error);
        }
        );
    });
  }

  getUsers(filter: Filter): Promise<UsersResponse>{
    return new Promise((resolve, reject) => {
      this.networkService.post("user/usersGet", filter,true).then((response: any) => {
          resolve(response);
      }, error => {
          reject(error);
      }
      );
    });
  }

  

}
