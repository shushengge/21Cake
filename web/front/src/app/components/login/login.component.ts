import { Component, OnInit } from '@angular/core';
import '../../../assets/common/base.css';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as $ from "jquery"


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit() {
        this.router.navigate(['login/login1']);
        $('.li-left').addClass('high')
  }

  tologin1(){
        $('.li-left').addClass('high')
        $('.li-right').removeClass('high')
  }
  tologin2(){
        $('.li-right').addClass('high')
        $('.li-left').removeClass('high')
  }
}