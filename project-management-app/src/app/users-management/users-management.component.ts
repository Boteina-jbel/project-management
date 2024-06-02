import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserServiceService } from '../services/user-service.service';
import { UtilsService } from '../services/utils.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KernelServiceService } from '../services/kernel-service.service';
import { AdminServiceService } from '../services/admin-service.service';
import { SpinnerService } from '../services/spinner.service';
import { GlobalConfig } from '../models/GlobalConfig';
import { Profile } from '../models/Profile';
import { Filter } from '../models/Filter';
import { Router } from '@angular/router';
import { UsersResponse } from '../models/UsersResponse';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.scss'],
})
export class UsersManagementComponent  implements OnInit {

  userForm        : FormGroup;
  filterForm      : FormGroup;
  pageSize        : number = 10;
  page            : number = 0;
  global          : GlobalConfig;
  profiles        : Profile[];
  showForm        : boolean = false;
  showFilterForm  : boolean = false;
  filter          : Filter = new Filter();
  defaultProfile  : Profile | undefined;
  usersResponse   : UsersResponse;

  constructor(
    private utilsService            : UtilsService,
    private modalCtrl               : ModalController,
    private userServiceService      : UserServiceService,
    private formBuilder             : FormBuilder,
    private kernelServiceService    : KernelServiceService,
    private adminServiceService     : AdminServiceService,
    private spinnerService          : SpinnerService,
    private router                  : Router
  ) {}


  async ngOnInit() {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: [''],
      password: [''],
      thumbnail: ['', Validators.required],
      profile: ['', Validators.required]
    });

    this.filterForm = this.formBuilder.group({
      page: [this.page],
      pageSize: [this.pageSize],
      firstName: [this.filter.firstName],
      lastName: [this.filter.lastName],
      username: [this.filter.username],
    });

    this.profiles = await this.kernelServiceService.getProfiles();

    this.filter.page = this.page;
    this.filter.pageSize = this.pageSize;
    // this.usersResponse = await this.adminServiceService.getUsers(this.filter);
  }

  async submitUserForm() {
    if (this.userForm.valid) {
      await this.adminServiceService.saveUser(this.userForm.value);
      this.clearForm();
    } else {
      this.spinnerService.presentAlert('error','Form is not valid')
    }
  }

  async submitFilterForm() {
    if (this.filterForm.valid) {
      this.filter = this.filterForm.value;
      this.usersResponse = await this.adminServiceService.getUsers(this.filter);
    } else {
      this.spinnerService.presentAlert('error','Form is not valid')
    }
  }

  handleFileSelected(fileBase64 : string) {
    this.userForm.patchValue({
      thumbnail: fileBase64
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  toggleFilterForm() {
    this.showFilterForm = !this.showFilterForm;
  }

  async paginate(action: string) {
    if (action === 'next' && ! this.usersResponse.last) {
      this.filter.page = this.usersResponse.number+1;
    } else if (action === 'prev' && ! this.usersResponse.first) {
      this.filter.page = this.usersResponse.number-1;
    }
    if ((action === 'next' && ! this.usersResponse.last) 
      || (action === 'prev' && ! this.usersResponse.first)) {
        this.filter.pageSize = this.pageSize;
        this.usersResponse = await this.adminServiceService.getUsers(this.filter);
    }
  }

  async clearFilter() {
    this.filterForm.reset({
      page: this.page,
      pageSize: this.pageSize,
      firstName: null,
      lastName: null,
      apogeeCode: null,
      studentNationalCode: null
    });
    this.showFilterForm = false;
    this.filter = this.filterForm.value;
    this.usersResponse = await this.adminServiceService.getUsers(this.filterForm.value);
  }

  async refresh() {
    this.usersResponse = await this.adminServiceService.getUsers(this.filter);
  }

  async clearForm() {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      thumbnail: ['', Validators.required],
      profile: ['', Validators.required]
    });

    this.defaultProfile = this.profiles.find(profile => profile.code === 'admin');
    this.userForm.patchValue({
      profile: this.defaultProfile
    });
  }


  openPersonPage(username: string) {
    this.router.navigate([`/user/${username}`]);
  }


}
