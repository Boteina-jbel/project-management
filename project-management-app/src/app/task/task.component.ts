import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../services/admin-service.service';
import { KernelServiceService } from '../services/kernel-service.service';
import { UtilsService } from '../services/utils.service';
import { ModalController, PopoverController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { BugTask } from '../models/BugTask';
import { FeatureTask } from '../models/FeatureTask';
import { Comment } from '../models/Comment';
import { TaskPopoverComponent } from '../components/task-popover/task-popover.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {

  popover: HTMLIonPopoverElement;
  type: string | null;
  id: number | null;
  bugTask: BugTask;
  featureTask: FeatureTask;
  comment: string;
  comments: Comment[];

  constructor(
    private adminService: AdminServiceService,
    private kernelService: KernelServiceService,
    private utilsService: UtilsService,
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private router: Router,
    private popoverController: PopoverController
  ) { }

  formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC'
    };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
  }

  async ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.type = params.get('type');
      const idParam = params.get('id');
      this.id = idParam !== null ? +idParam : null;
    });

    if (this.type && this.type === 'feature' && this.id) {
      this.featureTask = await this.kernelService.getFeatureTask(this.id);
    } else if (this.type && this.type === 'bug' && this.id) {
      this.bugTask = await this.kernelService.getBugTask(this.id);
    }

    if (this.id) this.comments = await this.kernelService.getComments(this.id);

  }

  openPersonPage(username: string) {
    this.router.navigate([`/user/${username}`]);
  }

  async addComment() {
    let comment = new Comment();
    comment.content = this.comment;
    if (this.bugTask) comment.task = this.bugTask;
    if (this.featureTask) comment.task = this.featureTask;
    comment = await this.kernelService.addCommment(comment);
    this.comments.push(comment);
    this.comment = '';
  }

  async delete(comment: Comment) {
    await this.kernelService.deleteCommment(comment.id);
    const index = this.comments.findIndex(e => e.id === comment.id);
    if (index !== -1) {
      this.comments.splice(index, 1);
    }
  }

  enableEdit(comment: any) {
    comment.isEditing = true;
    comment.editedContent = comment.content;
  }

  async saveEdit(comment: any) {
    comment.content = comment.editedContent;
    comment.isEditing = false;
    const commentResponse = await this.kernelService.saveCommment(comment);
    const index = this.comments.findIndex(e => e.id === commentResponse.id);
    if (index !== -1) {
      this.comments[index] = commentResponse;
    }
  }

  cancelEdit(comment: any) {
    comment.isEditing = false;
  }

  async presentPopover(ev: any) {
    if (this.type && this.type === 'feature') {
      this.popover = await this.popoverController.create({
        component: TaskPopoverComponent,
        componentProps: {
          featureTask: this.featureTask,
          popover: this.popover
        },
        cssClass: 'custom-popover',
        event: ev,
        translucent: true
      });

      await this.popover.present();

      const { data } = await this.popover.onWillDismiss();
      if (data?.role === 'save' && data.featureTask) {
        this.featureTask = data.featureTask;
      }
    } else if (this.type && this.type === 'bug') {
      this.popover = await this.popoverController.create({
        component: TaskPopoverComponent,
        componentProps: {
          bugTask: this.bugTask,
          popover: this.popover
        },
        cssClass: 'custom-popover',
        event: ev,
        translucent: true
      });

      await this.popover.present();

      const { data } = await this.popover.onWillDismiss();
      if (data?.role === 'save' && data.bugTask) {
        this.bugTask = data.bugTask;
      }
    }
  }

}

