import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ImagesComponent } from './gallery/images/images.component';
import { HttpClientModule } from '@angular/common/http';
import { SideBarComponent } from './gallery/side-bar/side-bar.component';
import { HeaderComponent } from './gallery/header/header.component';
import { FormsModule } from '@angular/forms';
import { ProgressBarComponent } from './gallery/progress-bar/progress-bar.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { GroomComponent } from './gallery/groom/groom.component';
import { CheckboxDirective } from './directive/checkbox.directive';
import { RecycleBinComponent } from './gallery/recycle-bin/recycle-bin.component';

import { HomeComponent } from './home/home.component';
import { ToastrModule } from 'ngx-toastr';
// import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingComponent } from './gallery/loading/loading.component';
import { Component } from '@angular/core';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent,
    ImagesComponent,
    SideBarComponent,
    HeaderComponent,
    ProgressBarComponent,
    GroomComponent,
    CheckboxDirective,
    RecycleBinComponent,
    HomeComponent,
    LoadingComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    NgCircleProgressModule.forRoot({
      // "backgroundColor": "maroon",
      "radius": 50,
      "maxPercent": 100,
      "unitsColor": "#FFFFFF",
      "outerStrokeWidth": 5,
      "outerStrokeColor": "#FFFFFF",
      "innerStrokeColor": "#FFFFFF",
      "titleColor": "#FFFFFF",
      "subtitleColor": "#483500",
      "showSubtitle": false,
      "showInnerStroke": false,
      "startFromZero": false,


      // HttpClientModule,
      // CookieModule.forRoot()
    }),

    ToastrModule.forRoot(
      {
        positionClass: 'toast-top-center',
        tapToDismiss: true,
        progressBar: true,
        progressAnimation: 'increasing',
        maxOpened: 3,
        autoDismiss: true,
        preventDuplicates: true,
        resetTimeoutOnDuplicate: true,
        newestOnTop: false,
        timeOut: 5000,
        extendedTimeOut: 1500,
        enableHtml: true
      }),
      ConfirmationPopoverModule.forRoot({
        confirmButtonType: 'danger' // set defaults here
      })
    // ,NgxPageScrollCoreModule,

  ],
  providers: [
    ImagesComponent,
    // SideBarComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
