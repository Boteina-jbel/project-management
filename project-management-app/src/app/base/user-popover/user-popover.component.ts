import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { SecurityDTO } from 'src/app/models/msg/SecurityDTO';
import { SecurityServiceService } from 'src/app/services/security-service.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-user-popover',
  templateUrl: './user-popover.component.html',
  styleUrls: ['./user-popover.component.scss'],
})
export class UserPopoverComponent  implements OnInit {

  selectedLanguage    : string;
  securityDTO         : SecurityDTO;

  constructor(
    private utilsService      : UtilsService,
    private securityService   : SecurityServiceService,
    private popoverController: PopoverController
  ) {}

  async ngOnInit() {
    this.selectedLanguage = this.utilsService.getCurrentLanguage();
    this.securityDTO      = this.securityService.getSecurityInfo();  
  }

  switchLanguage(language: string) {
    console.log(language);
    this.selectedLanguage = language;
    this.utilsService.switchLanguage(language)
  }

  async logoutAction() {
    this.closePopover();
    await this.securityService.logout(this.securityDTO.username, this.securityDTO.token);
  }

  closePopover() {
    this.popoverController.dismiss();
  }
}
