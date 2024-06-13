import { Component, OnInit } from '@angular/core';
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
import { Priority } from '../models/Priority';
import { User } from '../models/User';
import { Project } from '../models/Project';

@Component({
  selector: 'app-feature-tasks',
  templateUrl: './feature-tasks.component.html',
  styleUrls: ['./feature-tasks.component.scss'],
})
export class FeatureTasksComponent implements OnInit {

  popover                 : HTMLIonPopoverElement;
  featureTasks            : FeatureTask[];
  filteredTasks           : FeatureTask[] = [];
  statuses                : TaskStatus[];
  teamMembers             : User[];
  assignedTo              : User | null;
  status                  : TaskStatus | null;
  priorities              : Priority[];
  priority                : Priority | null;
  projects                : Project[];
  project                 : Project | null;
  managers                : User[];
  managedBy               : User | null;

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
    this.filteredTasks = [...this.featureTasks];
    this.statuses = await this.kernelService.getTaskStatuses();
    this.statuses.sort((a, b) => a.position - b.position);
    this.priorities = await this.kernelService.getPriorities();
    this.teamMembers = await this.adminServiceService.getByProfileCode('TM');
    this.projects = await this.kernelService.getProjects();
    this.managers = await this.adminServiceService.getByProfileCode('PM');
  }

  async reload() {
    this.featureTasks = await this.kernelService.getFeatureTasks();
    this.statuses = await this.kernelService.getTaskStatuses();
    this.statuses.sort((a, b) => a.position - b.position);
    this.trackChange(null);
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
    if (data && data.role === 'save') {
      this.featureTasks.push(data.featureTask);
      this.trackChange(null);
    }
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
        this.trackChange(null);
      }
    } else if (data.role === 'save' && data.featureTask) {
      const index = this.featureTasks.findIndex(e => e.id === data.featureTask.id);
      if (index !== -1) {
        this.featureTasks[index] = data.featureTask;
        this.trackChange(null);
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
        this.trackChange(null);
      }
    }
  }

  async trackChange(event: any) {
    this.filteredTasks = this.featureTasks.filter(task => {
      return  (!this.project || !this.project.id || task.project.id === this.project.id) &&
              (!this.status || !this.status.id || task.status.id === this.status.id) &&
              (!this.priority || !this.priority.id || task.priority.id === this.priority.id) &&
              (!this.assignedTo || !this.assignedTo.id || task.assignedTo.id === this.assignedTo.id);
    });
  }

  async clearFilter() {
    this.project = null;
    this.status = null;
    this.priority = null;
    this.assignedTo = null;
    this.filteredTasks = [...this.featureTasks]; // Reset to original list
  }


  openPersonPage(username: string) {
    this.router.navigate([`/user/${username}`]);
  }
}
