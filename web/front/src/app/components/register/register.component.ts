import { Component, OnInit } from '@angular/core';
import '../../../assets/common/base.css';
import * as $ "jquery"

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    constructor() { }

    ngOnInit() {
        function createCode(){
            var code='';
            var codeLength = 4;
            var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R', 'S','T','U','V','W','X','Y','Z');
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
            var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R', 'S','T','U','V','W','X','Y','Z');
            for(var i = 0; i < codeLength; i++){
                var index = Math.floor(Math.random()*36);
                code += random[index]; 
            }
            return code;
        }
        
        $('.code').text(createCode())
    }

    toreg(){
        $('.hint').val('请将信息填写完整')
        if(($('.phone').val()==''){
            
        }
    }
    phone(){
        if(!/^1[34578]\d{9}$/.test($('.phone').val())){
                $('.hint').val('电话号码有误')
                $('.phone').val('')
                $('.phone').focus()
            }else{
                $('.hint').val('')
        }
    }
    user(){
        if(!/^[a-z][a-z0-9\-]{5,19}$/.test($('.user').val())){
                $('.hint').val('用户名有误')
                $('.user').val('')
                $('.user').focus()
            }else{
                $('.hint').val('')
        }
    }
    pass(){
        if(!/^[^\s]{6,20}$/.test($('.pass').val())){
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
}
