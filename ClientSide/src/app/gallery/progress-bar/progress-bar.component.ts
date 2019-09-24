import { Component, OnInit, Injectable, HostListener } from '@angular/core';
import { ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
@Injectable()
export class ProgressBarComponent{


  constructor(public imageService:ImagesService) {
    this.sizeUploadFiles=imageService.sizeUploadFiles;
    this.part=this.sizeUploadFiles/100;
    setInterval(() => { 
      this.per=this.per+1;
    }, this.sizeUploadFiles*60);
  }
  per:any=0.0;
  sizeUploadFiles:number;
  part:any=0.0;
 
}
