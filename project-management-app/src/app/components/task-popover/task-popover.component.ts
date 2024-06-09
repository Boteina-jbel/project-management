import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
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

  teamMembers             : User[];
  assignedTo              : User;
  statuses                : TaskStatus[];
  status                  : TaskStatus;
  priorities              : Priority[];
  priority                : Priority;

  constructor(
    private popoverController : PopoverController,
    private kernelService: KernelServiceService,
    private spinnerService: SpinnerService,
    private adminServiceService: AdminServiceService
  ) { }

  async ngOnInit() {
    this.statuses = await this.kernelService.getTaskStatuses();
    this.priorities = await this.kernelService.getPriorities();
    this.teamMembers = await this.adminServiceService.getByProfileCode('TM');

    if (this.featureTask) {
      if(this.featureTask.status) {
        const resultStatus = this.statuses.find(e => e.id === this.featureTask.status.id);
        if(resultStatus) this.status = resultStatus;
      }

      if(this.featureTask.priority) {
        const resultPriority = this.priorities.find(e => e.id === this.featureTask.priority.id);
        if(resultPriority) this.priority = resultPriority;
      }

      if(this.featureTask.assignedTo) {
        const resultAssignedTo = this.teamMembers.find(e => e.id === this.featureTask.assignedTo.id);
        if(resultAssignedTo) this.assignedTo = resultAssignedTo;
      }
    }

  }

  async changeStatus(event: any) {
    const featureTask = await this.kernelService.changeTaskStatus(this.featureTask.id, this.status.id);
    this.popover.dismiss({role: 'save', featureTask: featureTask});
  }

  async changePriority(event: any) {
    const featureTask = await this.kernelService.changeTaskPriority(this.featureTask.id, this.priority.id);
    this.popover.dismiss({role: 'save', featureTask: featureTask});
  }

  async changeAssignedTo(even: any) {
    const featureTask = await this.kernelService.assignTaskToUser(this.featureTask.id, this.assignedTo.id);
    this.popover.dismiss({role: 'save', featureTask: featureTask});
  }
}
