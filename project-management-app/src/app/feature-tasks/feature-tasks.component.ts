import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../services/utils.service';
import { ModalController } from '@ionic/angular';
import { UserServiceService } from '../services/user-service.service';
import { FormBuilder } from '@angular/forms';
import { KernelServiceService } from '../services/kernel-service.service';
import { AdminServiceService } from '../services/admin-service.service';
import { SpinnerService } from '../services/spinner.service';
import { Router } from '@angular/router';
import { FeatureTask } from '../models/FeatureTask';
import { FeatureTaskRequest } from '../models/FeatureTaskRequest';
import { FeaturetaskModalComponent } from '../components/featuretask-modal/featuretask-modal.component';
import { TaskStatus } from '../models/TaskStatus';

@Component({
  selector: 'app-feature-tasks',
  templateUrl: './feature-tasks.component.html',
  styleUrls: ['./feature-tasks.component.scss'],
})
export class FeatureTasksComponent  implements OnInit {

  featureTasks          : FeatureTask[];
  statuses              : TaskStatus[];

  constructor( private utilsService            : UtilsService,
    private modalCtrl               : ModalController,
    private userServiceService      : UserServiceService,
    private formBuilder             : FormBuilder,
    private kernelService    : KernelServiceService,
    private adminServiceService     : AdminServiceService,
    private spinnerService          : SpinnerService,
    private router                  : Router) { }

  async ngOnInit() {
    this.featureTasks = await this.kernelService.getFeatureTasks();
    this.statuses     = await this.kernelService.getTaskStatuses();
    this.statuses.sort((a, b) => a.position - b.position);
  }

  async reload(){
    this.featureTasks = await this.kernelService.getFeatureTasks();
    this.statuses     = await this.kernelService.getTaskStatuses();
    this.statuses.sort((a, b) => a.position - b.position);
  }
  getBackground(indice : number) {
    return this.utilsService.generateRandomSvgBackground(indice);
  }

  async openAddFeaturetaskModal() {
    const modal = await this.modalCtrl.create({
      component: FeaturetaskModalComponent,
      cssClass: 'card-modal',
      componentProps: {
        
      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if(data && data.role === 'save') this.featureTasks.push(data.featureTask);
  }

  async openFeatureTaskModal(featureTask : FeatureTask) {
    const modal = await this.modalCtrl.create({
      component: FeaturetaskModalComponent,
      cssClass: 'card-modal',
      componentProps: {
        featureTask: featureTask,
      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();

    if (data.role === 'delete') {
      const index = this.featureTasks.findIndex(e => e.id === featureTask.id);
      if (index !== -1) {
        this.featureTasks.splice(index, 1);
      }
    } else if (data.role === 'save' && data.featureTask) {
      console.log(data);
      const index = this.featureTasks.findIndex(e => e.id === data.featureTask.id);
      if (index !== -1) {
        this.featureTasks[index] = data.featureTask;
      }
    }
  }

  getWidth(length: number): number {
    return 100 / length;
  }
}
