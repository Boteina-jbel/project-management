import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../services/utils.service';
import { ModalController } from '@ionic/angular';
import { UserServiceService } from '../services/user-service.service';
import { FormBuilder } from '@angular/forms';
import { KernelServiceService } from '../services/kernel-service.service';
import { AdminServiceService } from '../services/admin-service.service';
import { SpinnerService } from '../services/spinner.service';
import { Router } from '@angular/router';
import { Project } from '../models/Project';
import { ProjectModalComponent } from '../components/project-modal/project-modal.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {

  projects: Project[];

  constructor(
    private utilsService            : UtilsService,
    private modalCtrl               : ModalController,
    private userServiceService      : UserServiceService,
    private formBuilder             : FormBuilder,
    private kernelServiceService    : KernelServiceService,
    private adminServiceService     : AdminServiceService,
    private spinnerService          : SpinnerService,
    private router                  : Router
  ) {}

  async ngOnInit() {
    this.projects = await this.kernelServiceService.getProjects();
  }

  async reload(){
    this.projects = await this.kernelServiceService.getProjects();
  }
  getBackground(indice : number) {
    return this.utilsService.generateRandomSvgBackground(indice);
  }

  async openAddCourseModal() {
    const modal = await this.modalCtrl.create({
      component: ProjectModalComponent,
      cssClass: 'card-modal',
      componentProps: {
        
      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if(data && data.role === 'save') this.projects.push(data.course);
  }

  async openProjectModal(project : Project) {
    const modal = await this.modalCtrl.create({
      component: ProjectModalComponent,
      cssClass: 'card-modal',
      componentProps: {
        project: project,
      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();

    if (data.role === 'delete') {
      const index = this.projects.findIndex(e => e.id === project.id);
      if (index !== -1) {
        this.projects.splice(index, 1);
      }
    } else if (data.role === 'save' && data.project) {
      const index = this.projects.findIndex(e => e.id === data.project.id);
      if (index !== -1) {
        this.projects[index] = data.course;
      }
    }
  }
}
