import { Component, OnInit } from '@angular/core';
import { HttpclientService } from "../../servers/httpclient.service"


@Component({
  selector: 'index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private http: HttpclientService ) { }

  ngOnInit() {
  //测试
    this.http.get("http://localhost:8080/frontProducts").then((res)=>{
        console.log(res);
    })
  }

}
