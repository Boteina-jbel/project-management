import { Injectable } from '@angular/core';
import { ConfigurationService } from './configuration.service';
import { NetworkServiceService } from './network-service.service';
import { SpinnerService } from './spinner.service';
import { KernelServiceService } from './kernel-service.service';
@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  private readonly MODULE_GET_URL: string = 'admin/';

  constructor(
    private configurationService  : ConfigurationService,
    private networkService        : NetworkServiceService,
    private spinnerService        : SpinnerService,
    private kernelServiceService : KernelServiceService
  ) {}

  // createStudent(student: Student) : Promise<Student>{
  //   return new Promise((resolve, reject) => {
  //       student.citizenship.cities = [];
  //       this.networkService.post(this.MODULE_GET_URL + "studentSave", student, true).then((response: any) => {
  //           resolve(response);
  //       }, error => {
  //           reject(error);
  //       }
  //       );
  //   });
  // }

  

}
