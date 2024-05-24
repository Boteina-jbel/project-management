import { Injectable } from '@angular/core';
import { NetworkServiceService } from './network-service.service';
import { SpinnerService } from './spinner.service';
import { ConfigurationService } from './configuration.service';
import { Country } from '../models/Country';
import { Profile } from '../models/Profile';
import { LegalIdType } from '../models/LegalIdType';
import { University } from '../models/University';
import { Establishment } from '../models/Establishment';
import { Department } from '../models/Department';
import { AcademicProgram } from '../models/AcademicProgram';
import { Degree } from '../models/Degree';
import { Course } from '../models/Course';
import { Semester } from '../models/Semester';
import { ClassRoom } from '../models/ClassRoom';
import { Person } from '../models/Person';

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
