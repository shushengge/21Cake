import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { HttpclientService } from "../../servers/httpclient.service";

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

    constructor(private http:HttpclientService) { }

    dataset: Array<any> = [];
    baseurl: string = this.http.baseurl+"temp/";
    show: number = 1;
    page: number = 1;
    tag: boolean = true;

    ngOnInit(){

        var pWidth = $(".nav").width(); //屏幕宽度

        $(".nav ul").on("click", "li", (e)=>{
            this.page = 1;
            this.show = 1;
            $(".content").unbind("scroll");
            var yLeft = $(e.target).position().left+$(e.target).width()/2; //元素中心距左边的距离
            var yRight = $(".nav ul").width() - $(e.target).position().left - $(e.target).width()/2;  //元素中心距右边的距离
            if(yLeft<pWidth/2){
                $(".nav ul").animate({left:0});
            }
            else if(yRight<pWidth/2){
                $(".nav ul").animate({left:-($(".nav ul").width()-pWidth)});
            }
            else{
                $(".nav ul").animate({left:-(yLeft-pWidth/2)});
            }
            $(e.target).addClass("active").siblings().removeClass("active");

            //点击导航栏加载对应类商品
            this.http.get("category", {category:$(e.target).data("category"), page:this.page, limit:8}).then((res)=>{
                this.dataset = res['data'];
            });
            //如果没有数据了，则不添加滚动事件
            if(this.show){
                $(".content").scroll(()=>{
                    //判断是否到达底部
                    if($(".content .upload").position().top+$(".content .upload").height()<=$(".content").height()){
                        console.log($(".content .upload").position().top+$(".content .upload").height(), $(".content").height());
                        //加标志，不让scroll多次触发
                        if(this.tag){
                            this.tag = false;
                            this.http.get("category", {category:$(e.target).data("category"), page:++this.page, limit:8}).then((res)=>{
                                for(var i=0; i<res['data'].length; i++){
                                    this.dataset.push(res['data'][i]);
                                }
                                this.tag = true;
                                //如果最后返回的数据没有8条，就移除scroll事件
                                if(res['data'].length<8){
                                    this.show = 0;
                                    $(".content").unbind("scroll");
                                }
                            });
                        }
                    }
                });
            }
        });
    }
 
}
