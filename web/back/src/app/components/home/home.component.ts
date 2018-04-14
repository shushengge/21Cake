import { Component, OnInit } from '@angular/core';
import {DictionaryService} from '../../services/dictionary.service'
import { Http } from '@angular/http'
import {HttpclientService} from '../../services/httpclient.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  bgcolor:boolean = false;
  redcolor:string;
  constructor(private dic:DictionaryService,private http:HttpclientService) { }

  ngOnInit() {
    //获取当前路由，在html中动态添加类名：active => 页面刷新，当前路由对应的标签背景变成红色
    let pathname = window.location.pathname.split('/');
    this.redcolor = pathname[pathname.length-1]
    this.http.get('backproducts').then((res)=>{
      if(res['error'] && !res['status']){
        location.href="login";
      }
    })
  }

  exit(){
    window.sessionStorage.removeItem('jjtoken');
    location.href="login";
  }

  navclick(e){
    // 获取a标签
    let a_link = document.getElementsByClassName('backcolor');
    if(e.target.parentNode.className== "backcolor") {
      for(var i=0; i<a_link.length;i++){
        a_link[i].children[0]['style']['backgroundColor']='#333'
      }
      e.target.style.backgroundColor = '#d64635';
    }else if( e.target.parentNode.parentNode.className="backcolor"){
      for(var i=0; i<a_link.length;i++){
        a_link[i].children[0]['style']['backgroundColor']='#333'
      }
      e.target.parentNode['style']['backgroundColor']='#d64635';
    }

  }
}
