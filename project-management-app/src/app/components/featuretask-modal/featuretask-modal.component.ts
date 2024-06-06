import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { FeatureTaskResponse } from 'src/app/models/FeatureTaskResponse';
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

  @Input() featuretask    : FeatureTaskResponse;
  featuretaskForm         : FormGroup;
  teamMembers             : User[];
  assignedTo              : User;
  selectedFile            : File;
  projects                : Project[];
  project                 : Project;
  status                  : TaskStatus;
  statuses                :TaskStatus[];

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private kernelService: KernelServiceService,
    private spinnerService: SpinnerService,
    private adminServiceService: AdminServiceService
  ) { }


  async ngOnInit() {
    this.featuretaskForm = this.formBuilder.group({
      id             : [this.featuretask ? this.featuretask.id           : '' ],
      priority       : [this.featuretask ? this.featuretask.priority    : '' , Validators.required],
      name           : [this.featuretask ? this.featuretask.name         : '' , [Validators.required]],
      description    : [this.featuretask ? this.featuretask.description  : '' , [Validators.required]],
      assignedTo     : [this.featuretask ? this.featuretask.assignedTo    : '' , [Validators.required]],
      status         : [this.featuretask ? this.featuretask.status    : '' , [Validators.required]],
      project         : [this.featuretask ? this.featuretask.project    : '' , [Validators.required]],
      acceptanceCriteria         : [this.featuretask ? this.featuretask.acceptanceCriteria    : '' , [Validators.required]],
    });

    

    this.teamMembers = await this.adminServiceService.getByProfileCode('TM');
    this.projects = await this.kernelService.getProjects();
    this.statuses = await this.kernelService.getTaskStatuses();


    if (this.featuretask) {
      this.assignedTo = this.teamMembers[this.teamMembers.findIndex(e => e.id === this.featuretask.assignedTo.id)];
      this.project = this.projects[this.projects.findIndex(e => e.id === this.featuretask.project.id)];
      this.status = this.statuses[this.statuses.findIndex(e => e.id === this.featuretask.status.id)];
    }
  }

  closeModal() {
    this.modalCtrl.dismiss({ role : 'nothing'});
  }

  async submitForm(){
    if (this.featuretaskForm.valid) {
      let featuretask;
      if(this.featuretask && this.featuretask.id) featuretask = await this.adminServiceService.updateFeatureTask(this.featuretaskForm.value);
      else featuretask = await this.adminServiceService.saveFeatureTask(this.featuretaskForm.value);

      this.featuretaskForm.reset();
      this.modalCtrl.dismiss({ featuretask : featuretask, role : 'save'});
    } else {
      this.spinnerService.presentAlert('error','Form is not valid')
    }
  }


  async delete() {
    await this.adminServiceService.deleteFeatureTask(this.featuretask.id);
    this.featuretaskForm.reset();
    this.modalCtrl.dismiss({ featuretask : this.featuretask, role : 'delete'});
  }

}
