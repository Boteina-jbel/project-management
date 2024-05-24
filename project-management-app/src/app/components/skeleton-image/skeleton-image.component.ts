import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { UtilsService } from '../../services/utils.service';
import { ConfigurationService } from '../../services/configuration.service';

@Component({
  selector: 'app-skeleton-image',
  templateUrl: './skeleton-image.component.html',
  styleUrls: ['./skeleton-image.component.scss'],
})
export class SkeletonImageComponent  implements OnInit {

  loadedImage     : boolean = false;
  imageUrl        : string;
  // loadedImage     : string;
  @Input() src    : string;
  @Input() alt    : string;
  @Input() radius : string;
  @ViewChild('img') img: ElementRef;


  constructor(private utilsService: UtilsService) { }

  async ngOnInit() {
    // Solution 1 : fetch but this will be changed by static folder in the BE
    //this.loadedImage = await this.utilsService.imageGet(this.src, false);
    this.imageUrl = this.utilsService.imageServeUrlBuild(this.src);
  }

  imageLoaded() {
    this.loadedImage = true;
  }

  getBorderRadius(){
    return this.radius;
  }
}
