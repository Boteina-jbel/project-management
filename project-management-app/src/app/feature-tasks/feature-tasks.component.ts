import { Component, HostListener, OnInit } from '@angular/core';
import { UtilsService } from '../services/utils.service';
import { ModalController, PopoverController } from '@ionic/angular';
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
import { TaskPopoverComponent } from '../components/task-popover/task-popover.component';

@Component({
  selector: 'app-feature-tasks',
  templateUrl: './feature-tasks.component.html',
  styleUrls: ['./feature-tasks.component.scss'],
})
export class FeatureTasksComponent implements OnInit {

  popover: HTMLIonPopoverElement;
  featureTasks: FeatureTask[];
  statuses: TaskStatus[];
  width: number;

  constructor(private utilsService: UtilsService,
    private modalCtrl: ModalController,
    private userServiceService: UserServiceService,
    private formBuilder: FormBuilder,
    private kernelService: KernelServiceService,
    private adminServiceService: AdminServiceService,
    private spinnerService: SpinnerService,
    private router: Router,
    private popoverController: PopoverController,
  ) { }

  async ngOnInit() {
    this.featureTasks = await this.kernelService.getFeatureTasks();
    this.statuses = await this.kernelService.getTaskStatuses();
    this.statuses.sort((a, b) => a.position - b.position);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateWidth(event.target.innerWidth, this.statuses.length);
  }

  updateWidth(windowWidth: number, length: number): void {
    if (windowWidth <= 999) {
      this.width = 100;
    } else {
      this.width = 100 / length;
    }
  }
  
  async reload() {
    this.featureTasks = await this.kernelService.getFeatureTasks();
    this.statuses = await this.kernelService.getTaskStatuses();
    this.statuses.sort((a, b) => a.position - b.position);
  }
  getBackground(indice: number) {
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
    if (data && data.role === 'save') this.featureTasks.push(data.featureTask);
  }

  async openFeatureTaskModal(featureTask: FeatureTask) {
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
      const index = this.featureTasks.findIndex(e => e.id === data.featureTask.id);
      if (index !== -1) {
        this.featureTasks[index] = data.featureTask;
      }
    }
  }

  getWidth(length: number): number {
    return 100 / length;
  }

  async presentPopover(ev: any, featureTask: FeatureTask) {
    this.popover = await this.popoverController.create({
      component: TaskPopoverComponent,
      componentProps: {
        featureTask: featureTask,
        popover: this.popover
      },
      cssClass: 'custom-popover',
      event: ev,
      translucent: true
    });

    await this.popover.present();

    const { data } = await this.popover.onWillDismiss();
    if (data?.role === 'save' && data.featureTask) {
      const index = this.featureTasks.findIndex((e) => e.id === data.featureTask.id);
      if (index !== -1) {
        this.featureTasks[index] = data.featureTask;
      }
    }
  }
}
