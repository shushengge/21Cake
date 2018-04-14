import { Directive, ElementRef } from '@angular/core';
import * as $ from "jquery";

@Directive({
  selector: '[Load]'
})
export class LoadDirective {

    constructor(el: ElementRef) {
        var img = el.nativeElement;
        img.onload = function(){
            this.setAttribute("src", img.dataset.src);
        }
    }
}
