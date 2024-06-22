import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UtilsService } from '../services/utils.service';
import { ModalController, PopoverController } from '@ionic/angular';
import { UserServiceService } from '../services/user-service.service';
import { FormBuilder } from '@angular/forms';
import { KernelServiceService } from '../services/kernel-service.service';
import { AdminServiceService } from '../services/admin-service.service';
import { SpinnerService } from '../services/spinner.service';
import { Router } from '@angular/router';
import { FeatureTask } from '../models/FeatureTask';
import { FeatureTaskRequest } from '../models/FeatureTaskRequest';
import { FeaturetaskModalComponent } from '../components/featuretask-modal/featuretask-modal.component';
import { TaskStatus } from '../models/TaskStatus';
import { TaskPopoverComponent } from '../components/task-popover/task-popover.component';
import { Priority } from '../models/Priority';
import { User } from '../models/User';
import { Portfolio } from '../models/Portfolio';
import { BugTask } from '../models/BugTask';
import Chart from 'chart.js/auto';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {

  @ViewChild('featureTaskChart') featureTaskChart: ElementRef<HTMLCanvasElement>;
  @ViewChild('bugTaskChart') bugTaskChart: ElementRef<HTMLCanvasElement>;
  portfolio : Portfolio;
  featureTasks: FeatureTask[] = [];
  bugTasks: BugTask[] = [];
  statuses: TaskStatus[] = [];
  statusBugCounts: { [key: string]: number } = {};
  statusFeatureCounts: { [key: string]: number } = {};
  chartDataFeature: number[] = [];
  chartDataBug: number[] = [];
  chartLabels: string[] = [];
  chartOptions: any = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          stepSize: 1
        }
      }]
    }
  };

  constructor(private kernelService: KernelServiceService, private translate: TranslateService) { }

  async ngOnInit() {
    this.portfolio = await this.kernelService.getPortfolio();  

    this.featureTasks = await this.kernelService.getFeatureTasks();
    this.bugTasks = await this.kernelService.getBugTasks();
    this.statuses = await this.kernelService.getTaskStatuses();

    this.countTasksByStatus();
    this.drawCharts();
  }

  countTasksByStatus(): void {
    // Initialize counts
    this.statuses.forEach(status => {
      this.statusFeatureCounts[this.translate.instant(status.name.toUpperCase())] = 0;
      this.statusBugCounts[this.translate.instant(status.name.toUpperCase())] = 0;
    });

    // Count feature tasks by status
    this.featureTasks.forEach(task => {
      if (task.status && this.statusFeatureCounts[this.translate.instant(task.status.name.toUpperCase())] !== undefined) {
        this.statusFeatureCounts[this.translate.instant(task.status.name.toUpperCase())]++;
      }
    });

    // Count bug tasks by status
    this.bugTasks.forEach(task => {
      if (task.status && this.statusBugCounts[this.translate.instant(task.status.name.toUpperCase())] !== undefined) {
        this.statusBugCounts[this.translate.instant(task.status.name.toUpperCase())]++;
      }
    });

    // Extract labels from status counts
    this.chartLabels = Object.keys(this.statusFeatureCounts);

    // Extract data for feature tasks chart
    this.chartDataFeature = this.chartLabels.map(label => this.statusFeatureCounts[label]);

    // Extract data for bug tasks chart
    this.chartDataBug = this.chartLabels.map(label => this.statusBugCounts[label]);
  }

  drawCharts(): void {
    // Draw feature tasks chart
    const featureCanvas = this.featureTaskChart.nativeElement;
    const featureCtx = featureCanvas.getContext('2d');
    if(featureCtx) {
      new Chart(featureCtx, {
        type: 'bar',
        data: {
          labels: this.chartLabels,
          datasets: [{
            label: 'Feature Tasks',
            data: this.chartDataFeature,
            backgroundColor: '#3cba9f'
          }]
        },
        options: this.chartOptions
      });
    }

    // Draw bug tasks chart
    const bugCanvas = this.bugTaskChart.nativeElement;
    const bugCtx = bugCanvas.getContext('2d');
    if(bugCtx){
      new Chart(bugCtx, {
        type: 'bar',
        data: {
          labels: this.chartLabels,
          datasets: [{
            label: 'Bug Tasks',
            data: this.chartDataBug,
            backgroundColor: '#3cba9f'
          }]
        },
        options: this.chartOptions
      });
    } 
  }

  
}
