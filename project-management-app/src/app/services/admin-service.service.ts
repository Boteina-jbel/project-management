import { Injectable } from '@angular/core';
import { Student } from '../models/Student';
import { ConfigurationService } from './configuration.service';
import { NetworkServiceService } from './network-service.service';
import { SpinnerService } from './spinner.service';
import { Teacher } from '../models/Teacher';
import { Admin } from '../models/Admin';
import { Establishment } from '../models/Establishment';
import { KernelServiceService } from './kernel-service.service';
import { Filter } from '../models/Filter';
import { filter } from 'rxjs/operators';
import { PersonsResponse } from '../models/msg/PersonsResponse';
import { TeachersResponse } from '../models/msg/TeachersResponse';
import { StudentsResponse } from '../models/msg/StudentsResponse';
import { University } from '../models/University';
import { Department } from '../models/Department';
import { AcademicProgram } from '../models/AcademicProgram';
import { Course } from '../models/Course';
import { ClassRoom } from '../models/ClassRoom';

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
