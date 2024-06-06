import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../services/utils.service';
import { ModalController } from '@ionic/angular';
import { UserServiceService } from '../services/user-service.service';
import { FormBuilder } from '@angular/forms';
import { KernelServiceService } from '../services/kernel-service.service';
import { AdminServiceService } from '../services/admin-service.service';
import { SpinnerService } from '../services/spinner.service';
import { Router } from '@angular/router';
import { FeatureTaskResponse } from '../models/FeatureTaskResponse';
import { FeatureTaskRequest } from '../models/FeatureTaskRequest';
import { FeaturetaskModalComponent } from '../components/featuretask-modal/featuretask-modal.component';

@Component({
  selector: 'app-feature-tasks',
  templateUrl: './feature-tasks.component.html',
  styleUrls: ['./feature-tasks.component.scss'],
})
export class FeatureTasksComponent  implements OnInit {

  featureTaskResponse: FeatureTaskResponse[];
  featureTaskRequest: FeatureTaskRequest[];

  constructor( private utilsService            : UtilsService,
    private modalCtrl               : ModalController,
    private userServiceService      : UserServiceService,
    private formBuilder             : FormBuilder,
    private kernelServiceService    : KernelServiceService,
    private adminServiceService     : AdminServiceService,
    private spinnerService          : SpinnerService,
    private router                  : Router) { }

  async ngOnInit() {
    this.featureTaskResponse = await this.kernelServiceService.getFeatureTasks();
  }

  async reload(){
    this.featureTaskResponse = await this.kernelServiceService.getFeatureTasks();
  }
  getBackground(indice : number) {
    return this.utilsService.generateRandomSvgBackground(indice);
  }

  async openAddCourseModal() {
    const modal = await this.modalCtrl.create({
      component: FeaturetaskModalComponent,
      cssClass: 'card-modal',
      componentProps: {
        
      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if(data && data.role === 'save') this.featureTaskResponse.push(data.featureTaskResponse);
  }

  async openFeatureTasktModal(featureTaskResponse : FeatureTaskResponse) {
    const modal = await this.modalCtrl.create({
      component: FeaturetaskModalComponent,
      cssClass: 'card-modal',
      componentProps: {
        featureTaskResponse: featureTaskResponse,
      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();

    if (data.role === 'delete') {
      const index = this.featureTaskResponse.findIndex(e => e.id === featureTaskResponse.id);
      if (index !== -1) {
        this.featureTaskResponse.splice(index, 1);
      }
    } else if (data.role === 'save' && data.featureTaskResponse) {
      const index = this.featureTaskResponse.findIndex(e => e.id === data.featureTaskResponse.id);
      if (index !== -1) {
        this.featureTaskResponse[index] = data.featureTaskResponse;
      }
    }
  }
}
