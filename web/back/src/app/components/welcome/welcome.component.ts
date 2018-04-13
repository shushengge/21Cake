import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http'
import {HttpclientService} from '../../services/httpclient.service'

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private http:HttpclientService) { }

  ngOnInit() {
      this.http.get('backproducts').then((res)=>{
        if(res['error'] && !res['status']){
          location.href="login";
        }
      })
  }

}
