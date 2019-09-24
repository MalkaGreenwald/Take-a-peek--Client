import { Component, OnInit } from '@angular/core';
import { ImagesService } from '../services/images.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  flag:boolean=false;
  constructor(public imagesService:ImagesService) { }

  ngOnInit() {
  }


}
