import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[required]',

})
export class RequiredDirective {

  constructor(private eleRef: ElementRef) {


}

ngAfterViewInit(): void {
  //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
  //Add 'implements AfterViewInit' to the class.
  //console.log(this.eleRef.nativeElement.innerHTML);
  this.eleRef.nativeElement.innerHTML = this.eleRef.nativeElement.innerHTML + "<span style='color:red;margin-left:2px;' class='bg-transparent'>*</span>";
  //this.eleRef.nativeElement.style.background = 'white';
}

}
