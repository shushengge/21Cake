import { Component, OnInit } from '@angular/core';
import { HttpclientService } from "../../servers/httpclient.service"
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'hotshop',
  templateUrl: './hotshop.component.html',
  styleUrls: ['./hotshop.component.scss']
})
export class HotshopComponent implements OnInit {

    dataset:Array<any>;
    link:string=this.http.baseurl+"temp/";

    //  = [
    //     {id:1,cnname:"Bailey's Love Triangle",cnpro:"百利甜情人",price:298,imgurl:"../../../assets/img/1.jpg"},
    //     {id:2,cnname:"Bailey's Love Triangle",cnpro:"百利甜情人",price:298,imgurl:"../../../assets/img/1.jpg"},
    //     {id:3,cnname:"Bailey's Love Triangle",cnpro:"百利甜情人",price:298,imgurl:"../../../assets/img/1.jpg"},
    //     {id:4,cnname:"Bailey's Love Triangle",cnpro:"百利甜情人",price:298,imgurl:"../../../assets/img/1.jpg"},

    // ]
    constructor(private http: HttpclientService,private router: Router) { }

    ngOnInit() {
        this.http.get('frontProducts?page=1&limit=7').then((res)=>{
            this.dataset = res['data'];
        })
    }

    goto(id){
        this.router.navigate(['/details/'+id]);
    }

}
