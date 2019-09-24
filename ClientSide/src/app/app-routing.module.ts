import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ImagesComponent } from './gallery/images/images.component';
import { GalleryComponent } from './gallery/gallery.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"images",component:ImagesComponent},
  {path:"gallery",component:GalleryComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
