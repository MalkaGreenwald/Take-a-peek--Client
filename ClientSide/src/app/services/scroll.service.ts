import { Injectable, HostListener } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  isScroll:boolean=false;
  constructor() { }
    // scroll------------------------
    topPosToStartShowing = 100;
  
    @HostListener('window:scroll')
    checkScroll() {
  
      // window의 scroll top
      // Both window.pageYOffset and document.documentElement.scrollTop returns the same result in all the cases. window.pageYOffset is not supported below IE 9.
  
      const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  
      console.log('[scroll]', scrollPosition);
  
      // if (scrollPosition >= this.topPosToStartShowing) {
      //   this.isScroll = true;
      // } else {
      //   this.isScroll = false;
      // }
        
      if (scrollPosition==0) {
        this.isScroll = false;
      } else {
        this.isScroll = true;
      }
    }
  
    // TODO: Cross browsing
    // gotoTop() {
    //   window.scroll({
    //     top: 0,
    //     left: 0,
    //     behavior: 'smooth'
    //   });
    // }
  }
