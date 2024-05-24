import { Component, OnInit } from '@angular/core';
import { Person } from '../models/Person';
import { Student } from '../models/Student';
import { Teacher } from '../models/Teacher';
import { AdminServiceService } from '../services/admin-service.service';
import { KernelServiceService } from '../services/kernel-service.service';
import { UtilsService } from '../services/utils.service';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent  implements OnInit {

  username  : string | null;
  person    : Person;
  student   : Student;
  teacher   : Teacher;

  constructor(
    private adminService: AdminServiceService,
    private kernelService: KernelServiceService,
    private utilsService: UtilsService,
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  async ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.username = params.get('username');
    });

    if (this.username) {
      // this.person = await this.kernelService.personByUsernameGet(this.username)
    }
  }


}
