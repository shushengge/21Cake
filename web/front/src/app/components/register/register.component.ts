import { Component, OnInit } from '@angular/core';
import '../../../assets/common/base.css';
import * as $ from "jquery"
import { HttpclientService } from "../../servers/httpclient.service"
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    constructor(private http: HttpclientService,private router: Router) { }

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
        $('.in-code').val('')
        $('.code').text(createCode())
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
    user(){
        var user = document.querySelector('.user')
        if(!/^[a-z][a-z0-9\-]{5,19}$/.test(user['value'])){
                $('.hint').val('用户名有误')
                $('.user').val('')
                $('.user').focus()
            }else{
                $('.hint').val('')
        }
    }
    pass(){
        var pass = document.querySelector('.pass')
        if(!/^[^\s]{6,20}$/.test(pass['value'])){
                $('.hint').val('密码格式有误')
                $('.pass').val('')
                $('.pass').focus()
            }else{
                $('.hint').val('')
        }
    }
    pass2(){
        if($('.pass2').val() != $('.pass').val()){
                $('.hint').val('两次密码输入不一致')
                $('.pass2').val('')
                $('.pass2').focus()
            }else{
                $('.hint').val('')
        }
    }
    code(){
        if($('.in-code').val() != $('.code').text()){
                $('.hint').val('验证码输入有误')
                $('.in-code').val('')
                $('.in-code').focus()
            }else{
                $('.hint').val('')
        }
    }
    toreg(){
        if($('.phone').val()!=''&&$('.user').val()!=''&&$('.pass').val()!=''&&$('.pass2').val()!=''&&$('.in-code').val()!=''&&$('.in-note').val()!=''){
            this.http.get('register',{ username:$('.user').val(), password:$('.pass').val()}).then((res) => {
                 if(res['status']){
                   this.router.navigate(['login'])
                   }else{
                   alert('服务器连接失败')
                 }
            })
        }else{
            $('.hint').val('请将注册信息填写完整')
        }
    }
}
