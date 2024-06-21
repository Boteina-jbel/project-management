import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../services/utils.service';
import { ModalController, PopoverController } from '@ionic/angular';
import { UserServiceService } from '../services/user-service.service';
import { FormBuilder } from '@angular/forms';
import { KernelServiceService } from '../services/kernel-service.service';
import { AdminServiceService } from '../services/admin-service.service';
import { SpinnerService } from '../services/spinner.service';
import { Router } from '@angular/router';
import { BugTask } from '../models/BugTask';
import { BugTaskRequest } from '../models/BugTaskRequest';
import { TaskStatus } from '../models/TaskStatus';
import { TaskPopoverComponent } from '../components/task-popover/task-popover.component';
import { Priority } from '../models/Priority';
import { User } from '../models/User';
import { Project } from '../models/Project';
import { BugTaskModalComponent } from '../components/bug-task-modal/bug-task-modal.component';

@Component({
  selector: 'app-bug-tasks',
  templateUrl: './bug-tasks.component.html',
  styleUrls: ['./bug-tasks.component.scss'],
})
export class BugTasksComponent  implements OnInit {

  popover                 : HTMLIonPopoverElement;
  bugTasks            : BugTask[];
  filteredTasks           : BugTask[] = [];
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
    this.bugTasks = await this.kernelService.getBugTasks();
    this.filteredTasks = [...this.bugTasks];
    this.statuses = await this.kernelService.getTaskStatuses();
    this.statuses.sort((a, b) => a.position - b.position);
    this.priorities = await this.kernelService.getPriorities();
    this.teamMembers = await this.adminServiceService.getByProfileCode('TM');
    this.projects = await this.kernelService.getProjects();
    this.managers = await this.adminServiceService.getByProfileCode('PM');
  }

  async reload() {
    this.bugTasks = await this.kernelService.getBugTasks();
    this.statuses = await this.kernelService.getTaskStatuses();
    this.statuses.sort((a, b) => a.position - b.position);
    this.trackChange(null);
  }

  getBackground(indice: number) {
    return this.utilsService.generateRandomSvgBackground(indice);
  }

  async openAddBugTaskModal() {
    const modal = await this.modalCtrl.create({
      component: BugTaskModalComponent,
      cssClass: 'card-modal',
      componentProps: {

      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data && data.role === 'save') {
      this.bugTasks.unshift(data.bugTask);
      this.trackChange(null);
    }
  }

  async openBugTaskModal(bugTask: BugTask) {
    const modal = await this.modalCtrl.create({
      component: BugTaskModalComponent,
      cssClass: 'card-modal',
      componentProps: {
        bugTask: bugTask,
      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();

    if (data.role === 'delete') {
      const index = this.bugTasks.findIndex(e => e.id === bugTask.id);
      if (index !== -1) {
        this.bugTasks.splice(index, 1);
        this.trackChange(null);
      }
    } else if (data.role === 'save' && data.bugTask) {
      const index = this.bugTasks.findIndex(e => e.id === data.bugTask.id);
      if (index !== -1) {
        this.bugTasks[index] = data.bugTask;
        this.trackChange(null);
      }
    }
  }

  getWidth(length: number): number {
    return 100 / length;
  }

  async presentPopover(ev: any, bugTask: BugTask) {
    this.popover = await this.popoverController.create({
      component: TaskPopoverComponent,
      componentProps: {
        bugTask: bugTask,
        popover: this.popover
      },
      cssClass: 'custom-popover',
      event: ev,
      translucent: true
    });

    await this.popover.present();

    const { data } = await this.popover.onWillDismiss();
    if (data?.role === 'save' && data.bugTask) {
      const index = this.bugTasks.findIndex((e) => e.id === data.bugTask.id);
      if (index !== -1) {
        this.bugTasks[index] = data.bugTask;
        this.trackChange(null);
      }
    }
  }

  async trackChange(event: any) {
    this.filteredTasks = this.bugTasks.filter(task => {
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
    this.filteredTasks = [...this.bugTasks]; // Reset to original list
  }

  openPersonPage(username: string) {
    this.router.navigate([`/user/${username}`]);
  }


  openTaskPage(id: number) {
    this.router.navigate([`/task/bug/${id}`]);
  }
}
