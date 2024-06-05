import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FeatureTaskModalComponent } from '../components/feature-task-modal/feature-task-modal.component';

@Component({
  selector: 'app-feature-tasks',
  templateUrl: './feature-tasks.component.html',
  styleUrls: ['./feature-tasks.component.scss'],
})
export class FeatureTasksComponent  implements OnInit {

  constructor(
    private modalCtrl               : ModalController,
  ) { }

  ngOnInit() {}

  async openAddFeatureTaskModal() {
    const modal = await this.modalCtrl.create({
      component: FeatureTaskModalComponent,
      cssClass: 'card-modal',
      componentProps: {
        
      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    // if(data && data.role === 'save') this.projects.push(data.project);
  }

}
