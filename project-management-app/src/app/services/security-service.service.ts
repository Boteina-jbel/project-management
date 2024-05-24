import { Injectable } from '@angular/core';
import { ConfigurationService } from './configuration.service';
import { NetworkServiceService } from './network-service.service';
import { SpinnerService } from './spinner.service';
import { SecurityDTO } from '../models/msg/SecurityDTO';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SecurityServiceService {

  private readonly MODULE_GET_URL: string = 'security/';
  private readonly LOCAL_STORAGE_KEY: string = 'securityInfo';

  securityDTO: SecurityDTO = new SecurityDTO();

  constructor(
    private networkService: NetworkServiceService,
    private router: Router,
  ) { }

  login(username: string, password: string): Promise<SecurityDTO> {
    return new Promise((resolve, reject) => {
      this.securityDTO = new SecurityDTO();
      this.securityDTO.username = username;
      this.securityDTO.password = password;

      this.networkService.post(this.MODULE_GET_URL + "login", this.securityDTO, true).then((response: any) => {
        // Store the security info in LocalStorage
        localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(response));
        resolve(response);
      }, error => {
        reject(error);
      });
    });
  }

  logout(username: string, token: string) {
    return new Promise((resolve, reject) => {
      this.securityDTO = new SecurityDTO();
      this.securityDTO.username = username;
      this.securityDTO.token = token;

      this.networkService.post(this.MODULE_GET_URL + "logout", this.securityDTO, true).then((response: any) => {
        resolve(response);
        // Purge the security info from LocalStorage
        localStorage.removeItem(this.LOCAL_STORAGE_KEY);
        this.router.navigateByUrl('/login');
      }, error => {
        // Purge the security info from LocalStorage
        localStorage.removeItem(this.LOCAL_STORAGE_KEY);
        this.router.navigateByUrl('/login');
        reject(error);
      });
    });
  }

  // Method to retrieve security info from LocalStorage
  getSecurityInfo(): SecurityDTO {
    const storedInfo = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    const securityDTO = storedInfo ? JSON.parse(storedInfo) : null;
    // if(! securityDTO) this.router.navigateByUrl('/login');
    return securityDTO;
  }
}
