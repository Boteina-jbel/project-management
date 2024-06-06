import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { FeatureTaskResponse } from 'src/app/models/FeatureTaskResponse';
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
  managers                : User[];
  assignedTo              : User;
  selectedFile            : File;
  managedBy               : User;

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

    this.managers = await this.adminServiceService.getByProfileCode('PM');

    if (this.featuretask) {
      this.assignedTo = this.managers[this.managers.findIndex(e => e.id === this.featuretask.assignedTo.id)];
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

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.selectedFile = file;
    this.previewImage(file);
  }

  previewImage(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.featuretaskForm.patchValue({
        thumbnail: reader.result as string
      });
    };
  }

  async delete() {
    await this.adminServiceService.deleteFeatureTask(this.featuretask.id);
    this.featuretaskForm.reset();
    this.modalCtrl.dismiss({ featuretask : this.featuretask, role : 'delete'});
  }

}
