import { Component, OnInit } from '@angular/core';
import { HttpclientService } from "../../servers/httpclient.service"

@Component({
  selector: 'hotshop',
  templateUrl: './hotshop.component.html',
  styleUrls: ['./hotshop.component.scss']
})
export class HotshopComponent implements OnInit {

    dataset:Array<any> = [
        {id:1,cnname:"Bailey's Love Triangle",cnpro:"百利甜情人",price:298,imgurl:"../../../assets/img/1.jpg"},
        {id:2,cnname:"Bailey's Love Triangle",cnpro:"百利甜情人",price:298,imgurl:"../../../assets/img/1.jpg"},
        {id:3,cnname:"Bailey's Love Triangle",cnpro:"百利甜情人",price:298,imgurl:"../../../assets/img/1.jpg"},
        {id:4,cnname:"Bailey's Love Triangle",cnpro:"百利甜情人",price:298,imgurl:"../../../assets/img/1.jpg"},

    ]
    constructor(private http: HttpclientService) { }

    ngOnInit() {
        // this.http.get('http://10.3.136.159:8080/frontProducts?page=1&limit=7').subscribe((res)=>{
        //     console.log(res.json())
        //     this.dataset = res.json().data;
        // })
    }

}
