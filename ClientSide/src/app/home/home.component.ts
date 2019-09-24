import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImagesService } from '../services/images.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public router:Router,public imageService:ImagesService) { }

  ngOnInit() {
    this.imageService.isHome=true;
  }
  goToImage(){
this.router.navigate(['gallery']);
  }
}
