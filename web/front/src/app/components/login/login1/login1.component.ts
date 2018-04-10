import { Component, OnInit } from '@angular/core';
import * as $ "jquery"

@Component({
  selector: 'login1',
  templateUrl: './login1.component.html',
  styleUrls: ['./login1.component.css']
})
export class Login1Component implements OnInit {

  constructor() { }

  ngOnInit() {
        
  }
  username(){
    $('.hint').attr("value",'')
  }
}
