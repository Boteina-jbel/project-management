import { Component, Input, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { UtilsService } from '../services/utils.service';
import { KernelServiceService } from '../services/kernel-service.service';
import { UserPopoverComponent } from './user-popover/user-popover.component';
import { SecurityServiceService } from '../services/security-service.service';
import { User } from '../models/User';
import { GlobalConfig } from '../models/GlobalConfig';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent implements OnInit {

  pages                 : any[];
  global                : GlobalConfig;
  user                  : User;
  @Input() title        : string;
  @Input() introduction : string;


  currentYear: number = new Date().getFullYear();

  constructor(
    private kernelService         : KernelServiceService,
    private modalCtrl             : ModalController,
    private utilsService          : UtilsService,
    private popoverController     : PopoverController,
    private securityService       : SecurityServiceService,
  ) { }

  async ngOnInit() {
    this.user         = this.securityService.getSecurityInfo();
    this.pages        = this.utilsService.pagesConfigGet();
    this.global       = this.utilsService.globalGet();
  }


  async presentPopover(e: Event) {
    const popover = await this.popoverController.create({
      component: UserPopoverComponent,
      event: e,
    });

    await popover.present();

    const { data } = await popover.onDidDismiss();
  }
}

