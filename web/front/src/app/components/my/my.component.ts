import { Component, OnInit } from '@angular/core';
import '../../../assets/common/base.css'
import * as $ from "jquery"
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'my', 
  templateUrl: './my.component.html',
  styleUrls: ['./my.component.css']
})
export class MyComponent implements OnInit {

  constructor(private router: Router) { }
  show1: boolean = false;

  ngOnInit() {
        if(window.sessionStorage.getItem('username')==undefined){
            this.router.navigate(['login'])
        }
        $('.username').text(window.sessionStorage.getItem('username'))
  }
  quit(){
          sessionStorage.removeItem("username");
          sessionStorage.removeItem('xxtoken')
          sessionStorage.removeItem('userid')
          this.show1=true
          setTimeout(()=>{
            this.router.navigate(['index'])
          },1500)
  }

}
