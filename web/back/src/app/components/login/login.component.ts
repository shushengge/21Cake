import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http'
import {HttpclientService} from '../../services/httpclient.service'
// import {ModalService} from './services/modal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpclientService) { }

  ngOnInit() {
    // this.spinner.spinnerShow = true;
  }
  AfterContentInit(){
    // this.spinner.spinnerShow = false;
  }

  login(){
      let username = document.getElementsByName('username')[0]['value'];
      let password = document.getElementsByName('password')[0]['value'];
      this.http.get('admin',{username:username,password:password}).then((res)=>{
          let status = res['status'];
          if(status){
              window.sessionStorage.setItem('jjtoken',res['data'])
              location.href="home/welcome";
          }else{
            alert("登录失败，请取得权限再来")
          }
      })
  }

}
