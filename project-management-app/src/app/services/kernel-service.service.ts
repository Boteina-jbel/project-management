import { Injectable } from '@angular/core';
import { NetworkServiceService } from './network-service.service';
import { SpinnerService } from './spinner.service';
import { ConfigurationService } from './configuration.service';

@Injectable({
  providedIn: 'root'
})
export class KernelServiceService {

  private readonly MODULE_GET_URL: string = 'kernel/';

  constructor(
    private configurationService  : ConfigurationService,
    private networkService        : NetworkServiceService,
    private spinnerService        : SpinnerService,
  ) {}

  // personByUsernameGet(username : string): Promise<Person>{
  //   return new Promise((resolve, reject) => {
  //     this.networkService.get(this.MODULE_GET_URL + "personByUsernameGet/" + username , false).then((response: any) => {
  //         resolve(response);
  //     }, error => {
  //         reject(error);
  //     }
  //     );
  //   });
  // }

}
