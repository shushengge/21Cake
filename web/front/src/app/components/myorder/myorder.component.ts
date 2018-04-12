import { Component, OnInit } from '@angular/core';
import { HttpclientService } from "../../servers/httpclient.service"
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.css']
})
export class MyorderComponent implements OnInit {

  constructor(private router: Router,private http: HttpclientService) { }
  dataset : Array<any>;
  num;
  price:number;
  link:string=this.http.baseurl+"temp/";

  ngOnInit() {
         if(window.sessionStorage.getItem('username')==undefined){
            this.router.navigate(['login'])
        }
         this.http.get('userCart',{userid:'5acb0486cc8fa3dce16177f9'}).then((res) => {
             console.log(res)
             if(res['status']){
                document.querySelector('.hinder')['style']['display']='none'
                this.dataset = res["data"]
                this.num = this.dataset.length
                document.querySelector('.list-ul')['style']['width']=this.dataset.length*2.666667+'rem'
                var num1 = 0
                this.dataset.forEach(function(a){
                    num1+=a.price*a.qty
                })
                this.price=num1
             }else{
                document.querySelector('.hinder')['style']['display']='block'
             }
        })
  }
}
