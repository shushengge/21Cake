import { Component, OnInit } from '@angular/core';
 import { HttpclientService } from "../../servers/httpclient.service"
import { Router,ActivatedRoute,ParamMap } from '@angular/router'
import * as $ from "jquery";


@Component({
  selector: 'orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.scss']
})
export class OrderlistComponent implements OnInit {
    qty:Number;
    totalprice:Number;
    dataset:Array<any>;
    link:string=this.http.baseurl+"temp/";
    constructor(private http:HttpclientService) { }

    ngOnInit() {
        this.http.get('userCart?userid=5acb0486cc8fa3dce16177f9').then((res)=>{
            console.log(res)
            if(res['status']){
                
                this.dataset = res["data"];
                var qty = this.dataset['length'] > 0 ? this.dataset['length'] : 1;
                console.log(this.qty)
                var total = 0;

                this.dataset.forEach((item)=>{
                    console.log(item)
                    total += item.qty*item.price;
                    
                })
                this.totalprice = total;
                // $('.orderlist_pro .orderlist_prolist').width(190*this.dataset.length);
            }
        })


    }

    check(e){
        var ck = document.querySelectorAll('.orderlist_payways .payment_list .payment_app i')
        for(var i=0;i<ck.length;i++){
            if(ck[i] == e.target){
              e.target.className = 'active';
            }else{
                ck[i].className='';
            }
        }

    }
}
