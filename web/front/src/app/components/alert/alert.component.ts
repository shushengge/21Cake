import { Component, OnInit, Input } from '@angular/core';
import * as $ from "jquery";


@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
   show2 : boolean = true;

   @Input() params : string = "";

  constructor() { }

  ngOnInit() {
     
        setTimeout(()=>{
          this.params ? $(".alert p").text(this.params) : $(".alert p").text("加入成功");
        },36)
     
     setTimeout(()=>{
        this.show2 = false;
     }, 1000)
  }

}
