import { Component, OnInit } from '@angular/core';
import * as $ from "jquery"
import { HttpclientService } from "../../../servers/httpclient.service"
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'login2',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.css']
})
export class Login2Component implements OnInit {

  constructor(private router: Router,private http: HttpclientService) { }

  note:String;

  ngOnInit() {
        function createCode(){
            var code='';
            var codeLength = 4;
            var random = new Array<any>(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R', 'S','T','U','V','W','X','Y','Z');
            for(var i = 0; i < codeLength; i++){
                var index = Math.floor(Math.random()*36);
                code += random[index]; 
            }
            return code;
        }
            $('.code').text(createCode())
  }
  changeCode(){
        function createCode(){
            var code='';
            var codeLength = 4;
            var random = new Array<any>(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R', 'S','T','U','V','W','X','Y','Z');
            for(var i = 0; i < codeLength; i++){
                var index = Math.floor(Math.random()*36);
                code += random[index]; 
            }
            return code;
        }
        
        $('.code').text(createCode())
        $('in-code').val('')
    }
  tologin(){
      var phone = document.querySelector('.phone')
      if($('.phone').val()!=''&&$('.in-note').val()!=''&&$('.in-code').val()!=''){
            window.sessionStorage.setItem('username',phone['value'])
            this.router.navigate(['index'])
      }else{
        $('.hint').val('登录信息有误')
      }
  }
  phone(){
      var phone = document.querySelector('.phone')
      if(!/^1[34578]\d{9}$/.test(phone['value'])){
                $('.hint').val('电话号码有误')
                $('.phone').val('')
                $('.phone').focus()
            }else{
                $('.hint').val('')
        }
    }
    code(){
        if($('.in-code').val()!=$('.code').text()){
            $('.hint').val('验证码错误')
            $('.in-code').val('')
            $('.in-code').focus()
        }else{
            $('.hint').val('')
        }
    }
    innote(){
        if($('.in-note').val()!=this.note){
            $('.hint').val('短信验证码错误')
            $('.in-note').val('')
            $('.in-note').focus()
        }else{
            $('.hint').val('')
        }
    }
    getnote(){
        function createCode(){
            var code='';
            var codeLength = 4;
            var random = new Array<any>(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R', 'S','T','U','V','W','X','Y','Z');
            for(var i = 0; i < codeLength; i++){
                var index = Math.floor(Math.random()*36);
                code += random[index]; 
            }
            return code;
        }
        var a = createCode()
        console.log(a)
        this.note=a

        var countdown=60; 
        function settime(val) { 
            if (countdown == 0) {
                val.attr("disabled",false);
                val.val("获取验证码"); 
                countdown = 60; 
                return
            } else { 
                val.attr("disabled", true);
                val.val("重新发送(" + countdown + ")"); 
                countdown--; 
            } 
            setTimeout(function() { 
            settime(val) 
            },1000) 
        } 
        settime($('.note'))
    }
}
