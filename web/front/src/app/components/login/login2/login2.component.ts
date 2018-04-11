import { Component, OnInit } from '@angular/core';
import * as $ from "jquery"

@Component({
  selector: 'login2',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.css']
})
export class Login2Component implements OnInit {

  constructor() { }

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
    }

}
