import { Component, OnInit } from '@angular/core';
import { HttpclientService } from "../../servers/httpclient.service"


@Component({
  selector: 'index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

    constructor(private http: HttpclientService ) { }
    dataset : Array<any>;

    ngOnInit() {
        this.http.get('frontProducts?page=1&limit=7').then((res)=>{
            console.log(res)
            this.dataset = res["data"];
        })
        
        var swiper1 = new Swiper('.swiper-container',{  
            loop : true,
            pagination: {
                el: '.swiper-pagination',
            },
            autoplay: {
                delay: 3000,
                stopOnLastSlide: false,
                disableOnInteraction: false
            }
        });  

        var swiper2 = new Swiper('.swiper-flower',{  
            //是否开启无缝滚动
            loop : false,
            //是否轮播
            // autoplay: {
            //     delay: 3000,
            //     stopOnLastSlide: false,
            //     disableOnInteraction: false,
            // },
            effect : 'coverflow',
            slidesPerView: "auto",
            centeredSlides: true,
            coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows : true
            }
        });  
    }

}
