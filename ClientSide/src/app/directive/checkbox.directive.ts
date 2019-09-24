import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appCheckbox]'
})
export class CheckboxDirective {

 
  highlightColor: string = 'yellow';
     
  constructor(private el: ElementRef){
 this.el.nativeElement.style.backgroundColor = this.highlightColor;
}
}
