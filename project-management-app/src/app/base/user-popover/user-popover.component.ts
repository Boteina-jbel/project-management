import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { User } from 'src/app/models/Person';
import { SecurityServiceService } from 'src/app/services/security-service.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-user-popover',
  templateUrl: './user-popover.component.html',
  styleUrls: ['./user-popover.component.scss'],
})
export class UserPopoverComponent  implements OnInit {

  selectedLanguage    : string;
  user                : User;

  constructor(
    private utilsService      : UtilsService,
    private securityService   : SecurityServiceService,
    private popoverController : PopoverController
  ) {}

  async ngOnInit() {
    this.selectedLanguage = this.utilsService.getCurrentLanguage();
    this.user             = this.securityService.getSecurityInfo();  
  }

  switchLanguage(language: string) {
    console.log(language);
    this.selectedLanguage = language;
    this.utilsService.switchLanguage(language)
  }

  async logoutAction() {
    this.closePopover();
    await this.securityService.logout(this.user.username, this.user.token);
  }

  closePopover() {
    this.popoverController.dismiss();
  }
}
