import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { BugTask } from 'src/app/models/BugTask';
import { Priority } from 'src/app/models/Priority';
import { Project } from 'src/app/models/Project';
import { TaskStatus } from 'src/app/models/TaskStatus';
import { User } from 'src/app/models/User';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { KernelServiceService } from 'src/app/services/kernel-service.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-bug-task-modal',
  templateUrl: './bug-task-modal.component.html',
  styleUrls: ['./bug-task-modal.component.scss'],
})
export class BugTaskModalComponent  implements OnInit {

  @Input() bugTask        : BugTask;
  bugTaskForm             : FormGroup;
  teamMembers             : User[];
  assignedTo              : User;
  selectedFile            : File;
  projects                : Project[];
  project                 : Project;
  statuses                : TaskStatus[];
  status                  : TaskStatus;
  priorities              : Priority[];
  priority                : Priority;

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private kernelService: KernelServiceService,
    private spinnerService: SpinnerService,
    private adminServiceService: AdminServiceService
  ) { }


  async ngOnInit() {
    this.bugTaskForm = this.formBuilder.group({
      id                    : [this.bugTask ? this.bugTask.id           : '' ],
      priority              : [this.bugTask ? this.bugTask.priority    : '' ],
      name                  : [this.bugTask ? this.bugTask.name         : '' , [Validators.required]],
      description           : [this.bugTask ? this.bugTask.description  : '' , [Validators.required]],
      estimatedTime         : [this.bugTask ? this.bugTask.estimatedTime  : ''],
      assignedTo            : [this.bugTask ? this.bugTask.assignedTo    : ''],
      status                : [this.bugTask ? this.bugTask.status    : '' ],
      project               : [this.bugTask ? this.bugTask.project    : ''],
      stepsToReproduce      : [this.bugTask ? this.bugTask.stepsToReproduce    : ''],
    });

    

    this.teamMembers = await this.adminServiceService.getByProfileCode('TM');
    this.projects = await this.kernelService.getProjects();
    this.statuses = await this.kernelService.getTaskStatuses();
    this.priorities = await this.kernelService.getPriorities();


    if (this.bugTask) {
      if(this.bugTask.assignedTo) this.assignedTo = this.teamMembers[this.teamMembers.findIndex(e => e.id === this.bugTask.assignedTo.id)];
      if(this.bugTask.project) this.project = this.projects[this.projects.findIndex(e => e.id === this.bugTask.project.id)];
      if(this.bugTask.status) this.status = this.statuses[this.statuses.findIndex(e => e.id === this.bugTask.status.id)];
      if(this.bugTask.priority) this.priority = this.priorities[this.priorities.findIndex(e => e.id === this.bugTask.priority.id)];
    }
  }

  closeModal() {
    this.modalCtrl.dismiss({ role : 'nothing'});
  }


  get estimatedTimeControl(): AbstractControl {
    return this.bugTaskForm.get('estimatedTime')!;
  }

  validateTimeFormat() {
    this.estimatedTimeControl.updateValueAndValidity();
    if (this.estimatedTimeControl.invalid && (this.estimatedTimeControl.dirty || this.estimatedTimeControl.touched)) {
      this.spinnerService.presentAlert('error', 'The time format should be HH:mm');
    }
  }


  timeValidator(control: AbstractControl): { [key: string]: any } | null {
    const validTimeRegex = /^([0-1]\d|2[0-3]):[0-5]\d$/;
    const valid = validTimeRegex.test(control.value);
    return valid ? null : { invalidTime: { value: control.value } };
  }

  async submitForm(){
    if (this.bugTaskForm.valid) {
      let bugTask;
      if(this.bugTask && this.bugTask.id) bugTask = await this.adminServiceService.updateBugTask(this.bugTaskForm.value);
      else bugTask = await this.adminServiceService.saveBugTask(this.bugTaskForm.value);

      this.bugTaskForm.reset();
      this.modalCtrl.dismiss({ bugTask : bugTask, role : 'save'});
    } else {
      this.spinnerService.presentAlert('error','Form is not valid')
    }
  }


  async delete() {
    await this.adminServiceService.deleteBugTask(this.bugTask.id);
    this.bugTaskForm.reset();
    this.modalCtrl.dismiss({ bugTask : this.bugTask, role : 'delete'});
  }

}
