import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";


@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }


  show1(){
      $(".links").stop().slideToggle(200);
      $(".menu").toggleClass("fa fa-times");
      $(".menu").toggleClass("fa fa-bars");
  }

  ngOnInit() {
  }

}
