import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../services/admin-service.service';
import { KernelServiceService } from '../services/kernel-service.service';
import { UtilsService } from '../services/utils.service';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { BugTask } from '../models/BugTask';
import { FeatureTask } from '../models/FeatureTask';
import { Comment } from '../models/Comment';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent  implements OnInit {

  type              : string | null;
  id                : number | null;
  bugTask           : BugTask;
  featureTask       : FeatureTask;
  comment           : string;
  comments           : Comment[];

  constructor(
    private adminService: AdminServiceService,
    private kernelService: KernelServiceService,
    private utilsService: UtilsService,
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  async ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.type = params.get('type');
      const idParam = params.get('id');
      this.id = idParam !== null ? +idParam : null;
    });

    if(this.type && this.type === 'feature' && this.id) {
        this.featureTask = await this.kernelService.getFeatureTask(this.id);
    } else if(this.type && this.type === 'bug' && this.id) {
      this.bugTask = await this.kernelService.getBugTask(this.id);
    }

    if(this.id) this.comments = await this.kernelService.getComments(this.id);

  }

  openPersonPage(username: string) {
    this.router.navigate([`/user/${username}`]);
  }

  async addComment() {
    const comment = new Comment();
    comment.content = this.comment; 
    if(this.bugTask) comment.task = this.bugTask; 
    if(this.featureTask) comment.task = this.featureTask; 
    await this.kernelService.addCommment(comment);
  }
}
