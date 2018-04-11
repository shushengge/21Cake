import { Component, OnInit } from '@angular/core';
import '../../../assets/common/base.css';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as $ from "jquery"
import { HttpclientService } from "../../servers/httpclient.service"

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private router: Router, private http: HttpclientService) { }

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
  tologin(){
        this.http.get('login',{ username:$('.username').val(), password:$('.password').val() }).then((res) => {
            // if(res.status){
            //   this.router.navigate(['index'])
            //   }else{
            //   $('.hint').val('登录信息有误')
            //   $('.username').val('')
            //   $('.password').val('')
            //   $('.username').focus()
            // }
        })
    }
}