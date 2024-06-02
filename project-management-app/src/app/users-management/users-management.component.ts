import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserServiceService } from '../services/user-service.service';
import { UtilsService } from '../services/utils.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KernelServiceService } from '../services/kernel-service.service';
import { AdminServiceService } from '../services/admin-service.service';
import { SpinnerService } from '../services/spinner.service';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.scss'],
})
export class UsersManagementComponent  implements OnInit {

  constructor() {}

  async ngOnInit() {}

}
