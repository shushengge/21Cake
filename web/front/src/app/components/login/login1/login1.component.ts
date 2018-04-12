import { Component, OnInit } from '@angular/core';
import * as $ from "jquery"
import { HttpclientService } from "../../../servers/httpclient.service"
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'login1',
  templateUrl: './login1.component.html',
  styleUrls: ['./login1.component.css']
})
export class Login1Component implements OnInit {

  constructor(private router: Router,private http: HttpclientService) { }

  ngOnInit() {
        
  }
  username(){ 
    $('.hint').val('')
  }
    tologin(){
        var username = document.querySelector('.username')
        this.http.get('login',{ username:$('.username').val(), password:$('.password').val() }).then((res) => {
             if(res['status']){
                window.sessionStorage.setItem('xxtoken',res['data'])
                window.sessionStorage.setItem('userid',res['data1'][0]._id)
                window.sessionStorage.setItem('username',username['value'])
                
               this.router.navigate(['index'])
               }else{
               $('.hint').val('登录信息有误')
               $('.username').val('')
               $('.password').val('')
               $('.username').focus()
             }
        })
    }
}
