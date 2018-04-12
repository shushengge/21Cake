import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";


@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
    show2 : boolean = true;

  constructor() { }

  ngOnInit() {
     setTimeout(()=>{
        this.show2 = false;
     }, 1000)
  }

}
