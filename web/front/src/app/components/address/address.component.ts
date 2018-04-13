import { Component, OnInit } from '@angular/core';
import { HttpclientService } from "../../servers/httpclient.service";
import { CommontService } from "../../servers/commont.service";
import { Router } from '@angular/router';
import * as $ from "jquery";

@Component({
  selector: 'address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  constructor(private http : HttpclientService, private address : CommontService, private router: Router) { }

  obj: Array<any> = [];
  province: Array<any> = [];
  city: Array<any> = [];
  town: Array<any> = [];
  show: boolean = false;

    ngOnInit() {
        this.http.get("http://localhost:4200/assets/area/region.json").then((res)=>{
            this.obj = res["regions"];
            for(var i=0; i<res["regions"].length; i++){
                this.province.push(res["regions"][i]["name"])
            }
        });
    }
    
    //三级联动
    province1(e){
        let value1 = e.target.value;
        this.city = [];
        this.town = [];
        for(let i=0; i<this.obj.length; i++){
            if(this.obj[i].name == value1){
                for(let j=0; j<this.obj[i].regions.length; j++){
                    this.city.push(this.obj[i].regions[j].name);
                }
            }
        }
    }

    city1(e){
        let value2 = e.target.value;
        this.town = [];
        for(let i=0; i<this.obj.length; i++){
            if(this.obj[i].regions){
                for(let j=0; j<this.obj[i].regions.length; j++){
                    if(this.obj[i].regions[j].name == value2){
                        for(var k=0; k<this.obj[i].regions[j].regions.length; k++){
                            this.town.push(this.obj[i].regions[j].regions[k].name);
                        }
                    }
                }
            }
        }
    }

    //保存地址到服务
    save(){
        var name = $("#name").val();
        var phone = $("#phone").val();
        var province = $("#province").val();
        var city = $("#city").val();
        var town = $("#town").val();
        var street = $("#street").val();
        var men = $("#men").val();
        var arr = [
                    {"name": name}, 
                    {"phone": phone}, 
                    {"address": [
                                    {"province":province}, 
                                    {"city":city}, 
                                    {"town":town}
                                ]
                    }, 
                    {"street": street}, 
                    {"men": men}
                  ];
        if(name && phone && province!="__请选择__" && city!="__请选择__" && town!="__请选择__" && street && men){
            this.address.address = arr;
            this.router.navigate(["/orderlist"]);
        }else{
             this.show = true;
             setTimeout(()=>{
                 this.show = false;
             }, 1000)
        }
    }

    // 放回上一步
    back(){
        history.back();
    }

}
