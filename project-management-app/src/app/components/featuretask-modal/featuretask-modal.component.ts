import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { FeatureTask } from 'src/app/models/FeatureTask';
import { Priority } from 'src/app/models/Priority';
import { Project } from 'src/app/models/Project';
import { TaskStatus } from 'src/app/models/TaskStatus';
import { User } from 'src/app/models/User';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { KernelServiceService } from 'src/app/services/kernel-service.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-featuretask-modal',
  templateUrl: './featuretask-modal.component.html',
  styleUrls: ['./featuretask-modal.component.scss'],
})
export class FeaturetaskModalComponent  implements OnInit {

  @Input() featureTask    : FeatureTask;
  featureTaskForm         : FormGroup;
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
    this.featureTaskForm = this.formBuilder.group({
      id             : [this.featureTask ? this.featureTask.id           : '' ],
      priority       : [this.featureTask ? this.featureTask.priority    : '' , Validators.required],
      name           : [this.featureTask ? this.featureTask.name         : '' , [Validators.required]],
      description    : [this.featureTask ? this.featureTask.description  : '' , [Validators.required]],
      estimatedTime    : [this.featureTask ? this.featureTask.estimatedTime  : '' , [Validators.required, this.timeValidator]],
      assignedTo     : [this.featureTask ? this.featureTask.assignedTo    : '' , [Validators.required]],
      status         : [this.featureTask ? this.featureTask.status    : '' , [Validators.required]],
      project         : [this.featureTask ? this.featureTask.project    : '' , [Validators.required]],
      acceptanceCriteria         : [this.featureTask ? this.featureTask.acceptanceCriteria    : ''],
    });

    

    this.teamMembers = await this.adminServiceService.getByProfileCode('TM');
    this.projects = await this.kernelService.getProjects();
    this.statuses = await this.kernelService.getTaskStatuses();
    this.priorities = await this.kernelService.getPriorities();


    if (this.featureTask) {
      this.assignedTo = this.teamMembers[this.teamMembers.findIndex(e => e.id === this.featureTask.assignedTo.id)];
      this.project = this.projects[this.projects.findIndex(e => e.id === this.featureTask.project.id)];
      this.status = this.statuses[this.statuses.findIndex(e => e.id === this.featureTask.status.id)];
      this.priority = this.priorities[this.priorities.findIndex(e => e.id === this.featureTask.priority.id)];
    }
  }

  closeModal() {
    this.modalCtrl.dismiss({ role : 'nothing'});
  }


  get estimatedTimeControl(): AbstractControl {
    return this.featureTaskForm.get('estimatedTime')!;
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
    if (this.featureTaskForm.valid) {
      let featureTask;
      if(this.featureTask && this.featureTask.id) featureTask = await this.adminServiceService.updateFeatureTask(this.featureTaskForm.value);
      else featureTask = await this.adminServiceService.saveFeatureTask(this.featureTaskForm.value);

      this.featureTaskForm.reset();
      this.modalCtrl.dismiss({ featureTask : featureTask, role : 'save'});
    } else {
      this.spinnerService.presentAlert('error','Form is not valid')
    }
  }


  async delete() {
    await this.adminServiceService.deleteFeatureTask(this.featureTask.id);
    this.featureTaskForm.reset();
    this.modalCtrl.dismiss({ featureTask : this.featureTask, role : 'delete'});
  }

}
