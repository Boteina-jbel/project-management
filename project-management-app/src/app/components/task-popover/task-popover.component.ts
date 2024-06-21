import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { BugTask } from 'src/app/models/BugTask';
import { FeatureTask } from 'src/app/models/FeatureTask';
import { Priority } from 'src/app/models/Priority';
import { TaskStatus } from 'src/app/models/TaskStatus';
import { User } from 'src/app/models/User';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { KernelServiceService } from 'src/app/services/kernel-service.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-task-popover',
  templateUrl: './task-popover.component.html',
  styleUrls: ['./task-popover.component.scss'],
})
export class TaskPopoverComponent implements OnInit {

  @Input() popover: HTMLIonPopoverElement;
  @Input() featureTask: FeatureTask;
  @Input() bugTask: BugTask;

  teamMembers: User[];
  assignedTo: User;
  statuses: TaskStatus[];
  status: TaskStatus;
  priorities: Priority[];
  priority: Priority;

  constructor(
    private popoverController: PopoverController,
    private kernelService: KernelServiceService,
    private spinnerService: SpinnerService,
    private adminServiceService: AdminServiceService
  ) { }

  async ngOnInit() {
    this.statuses = await this.kernelService.getTaskStatuses();
    this.priorities = await this.kernelService.getPriorities();
    this.teamMembers = await this.adminServiceService.getByProfileCode('TM');

    if (this.featureTask) {
      if (this.featureTask.status) {
        const resultStatus = this.statuses.find(e => e.id === this.featureTask.status.id);
        if (resultStatus) this.status = resultStatus;
      }

      if (this.featureTask.priority) {
        const resultPriority = this.priorities.find(e => e.id === this.featureTask.priority.id);
        if (resultPriority) this.priority = resultPriority;
      }

      if (this.featureTask.assignedTo) {
        const resultAssignedTo = this.teamMembers.find(e => e.id === this.featureTask.assignedTo.id);
        if (resultAssignedTo) this.assignedTo = resultAssignedTo;
      }
    }


    if (this.bugTask) {
      if (this.bugTask.status) {
        const resultStatus = this.statuses.find(e => e.id === this.bugTask.status.id);
        if (resultStatus) this.status = resultStatus;
      }

      if (this.bugTask.priority) {
        const resultPriority = this.priorities.find(e => e.id === this.bugTask.priority.id);
        if (resultPriority) this.priority = resultPriority;
      }

      if (this.bugTask.assignedTo) {
        const resultAssignedTo = this.teamMembers.find(e => e.id === this.bugTask.assignedTo.id);
        if (resultAssignedTo) this.assignedTo = resultAssignedTo;
      }
    }
  }

  async changeStatus(event: any) {
    if (this.featureTask) {
      const featureTask = await this.kernelService.changeFeatureTaskStatus(this.featureTask.id, this.status.id);
      this.popover.dismiss({ role: 'save', featureTask: featureTask });
    } else if (this.bugTask) {
      const bugTask = await this.kernelService.changeBugTaskStatus(this.bugTask.id, this.status.id);
      this.popover.dismiss({ role: 'save', bugTask: bugTask });
    }
  }

  async changePriority(event: any) {
    if (this.featureTask) {
      const featureTask = await this.kernelService.changeFeatureTaskPriority(this.featureTask.id, this.priority.id);
      this.popover.dismiss({ role: 'save', featureTask: featureTask });
    } else if (this.bugTask) {
      const bugTask = await this.kernelService.changeBugTaskPriority(this.bugTask.id, this.priority.id);
      this.popover.dismiss({ role: 'save', bugTask: bugTask });
    }
  }

  async changeAssignedTo(even: any) {
    if (this.featureTask) {
      const featureTask = await this.kernelService.assignFeatureTaskToUser(this.featureTask.id, this.assignedTo.id);
      this.popover.dismiss({ role: 'save', featureTask: featureTask });
    } else if (this.bugTask) {
      const bugTask = await this.kernelService.assignBugTaskToUser(this.bugTask.id, this.assignedTo.id);
      this.popover.dismiss({ role: 'save', bugTask: bugTask });
    }
  }
}
