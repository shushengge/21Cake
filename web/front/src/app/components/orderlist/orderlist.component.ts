import { Component, OnInit,Input } from '@angular/core';
 import { HttpclientService } from "../../servers/httpclient.service"
import { Router,ActivatedRoute,ParamMap } from '@angular/router'
import { CommontService } from "../../servers/commont.service";
import * as $ from "jquery";


@Component({
  selector: 'orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.scss'],
})
export class OrderlistComponent implements OnInit {
    @Input() params : string = "";

    show: boolean = false;
    show1: boolean = false;

    qty:Number;
    totalprice:Number;
    dataset:Array<any>;
    link:string=this.http.baseurl+"temp/";
    constructor(private http:HttpclientService, private address : CommontService,private router :Router) { }
    xx:Array<any> = [];
    ngOnInit() {
        this.xx = this.address.address;
        this.http.get("userCart",{userid:window.sessionStorage.getItem('userid')}).then((res)=>{

        // this.http.get('userCart?userid=5acb0486cc8fa3dce16177f9').then((res)=>{
            if(res['status']){
                this.dataset = res["data"];
                var qty = this.dataset.length;
                var total = 0;
                this.dataset.forEach((item)=>{
                    total += item.qty*item.price;
                })
                this.totalprice = total;
                $('.orderlist_pro .orderlist_prolist').width(210*this.dataset.length);
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

    sure(){
        this.show = false;
        if(this.xx.length>0){
            this.http.get("payUpdate",{userid:window.sessionStorage.getItem('userid'),status:0}).then((res)=>{
                if(res['data'].ok == 1){
                    this.show = true;
                    setTimeout((e)=>{
                        // location.href="/index";
                        this.router.navigate(['/index'])
                    },1500)
                }
            })
        }else{
           this.show1 = true;
        }
    }

    back(){
        history.back()
    }
}
