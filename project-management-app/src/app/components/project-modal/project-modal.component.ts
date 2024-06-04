import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Project } from 'src/app/models/Project';
import { User } from 'src/app/models/User';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { KernelServiceService } from 'src/app/services/kernel-service.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.scss'],
})
export class ProjectModalComponent  implements OnInit {

  @Input() project    : Project;
  projectForm         : FormGroup;
  managers            : User[];
  selectedFile        : File;
  managedBy           : User;

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private kernelService: KernelServiceService,
    private spinnerService: SpinnerService,
    private adminServiceService: AdminServiceService
  ) { }
  
  async ngOnInit() {
    this.projectForm = this.formBuilder.group({
      id             : [this.project ? this.project.id           : '' ],
      thumbnail      : [this.project ? this.project.thumbnail    : '' , Validators.required],
      name           : [this.project ? this.project.name         : '' , [Validators.required]],
      description    : [this.project ? this.project.description  : '' , [Validators.required]],
      managedBy      : [this.project ? this.project.managedBy    : '' , [Validators.required]],
    });

    this.managers = await this.adminServiceService.getByProfileCode('PM');

    if (this.project) {
      this.managedBy = this.managers[this.managers.findIndex(e => e.id === this.project.managedBy.id)];
    }
  }

  closeModal() {
    this.modalCtrl.dismiss({ role : 'nothing'});
  }

  async submitForm(){
    if (this.projectForm.valid) {
      let project;
      if(this.project && this.project.id) project = await this.adminServiceService.updateProject(this.projectForm.value);
      else project = await this.adminServiceService.saveProject(this.projectForm.value);

      this.projectForm.reset();
      this.modalCtrl.dismiss({ project : project, role : 'save'});
    } else {
      this.spinnerService.presentAlert('error','Form is not valid')
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.selectedFile = file;
    this.previewImage(file);
  }

  previewImage(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.projectForm.patchValue({
        thumbnail: reader.result as string
      });
    };
  }

  async delete() {
    await this.adminServiceService.deleteProject(this.project.id);
    this.projectForm.reset();
    this.modalCtrl.dismiss({ project : this.project, role : 'delete'});
  }
}
