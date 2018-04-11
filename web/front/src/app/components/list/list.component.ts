import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";


@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

    constructor() { }

    dataset: Array<any> = [];

    ngOnInit(){
        var pWidth = $(".nav").width(); //屏幕宽度
        $(".nav ul").on("click", "li", function(){
        var yLeft = $(this).position().left+$(this).width()/2; //元素中心距左边的距离
        var yRight = $(".nav ul").width() - $(this).position().left - $(this).width()/2;  //元素中心距右边的距离
            if(yLeft<pWidth/2){
                $(".nav ul").animate({left:0});
            }
            else if(yRight<pWidth/2){
                $(".nav ul").animate({left:-($(".nav ul").width()-pWidth)});
            }
            else{
                $(".nav ul").animate({left:-(yLeft-pWidth/2)});
            }
            $(this).addClass("active").siblings().removeClass("active");
        });
    }

}
