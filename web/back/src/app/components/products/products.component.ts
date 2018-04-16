import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http'
import {Utils} from '../../utils/utils'

import {DictionaryService} from '../../services/dictionary.service'
import {HttpclientService} from '../../services/httpclient.service'

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css',
    '../welcome/welcome.component.css',
    '../../../../node_modules/bootstrap/dist/css/bootstrap.css'
  ]
})
export class ProductsComponent implements OnInit {
    dataset:Array<any>=[];
    dsColumns: Array<string> = [];
  	columns: Array<string> = [];
  	filterColumns: Array<string> = [];
  	hideColumns: Array<string> = [];
    show:boolean = false;
    show_1:boolean = false;
    searchValue:string = '';
    Name:string ="" ;
    Title:string ="";
    Price:number =0;
    Number:number =12;
    Img:string ="1.jpg";
    Hot:string ="";
    Id:string;
    Enname:string ="";
    Category:string ="cake";
    Weight:number = 2.0;
    limit:number = 10;
    // 页数
    pageNumber:number = 6;
    pageNumberArray:Array<any> = [];
    num:number = 0;
    productsqty:number = 0;

    constructor(private http: HttpclientService,private dic:DictionaryService) { }


    xuanran(e ?,num ?){
      this.http.get('http://localhost:4200/assets/config/products.txt').then((config)=>{
          if(config['cols']){
          this.columns = config['cols'].split(',');
        }
        if(config['filterCols']){
          this.filterColumns = config['filterCols'].split(',');
        }
        if(config['hideCols']){
          this.hideColumns = config['hideCols'].split(',');
        }
        this.http.get('backproducts',{page:num?num:1,limit:this.limit,title:this.searchValue}).then((res)=>{
          if(res['error'] && !res['status']){
            location.href="login";
          }
          this.pageNumber =Math.ceil(res['count'] /this.limit);
          this.productsqty = res['count'];
          // 循环前清零

          this.pageNumberArray=[];
          for(var i=0;i<this.pageNumber+1;i++){
            if(i!=0){
              this.pageNumberArray.push(i);
            }
          }
          this.dataset = res['data'];
          this.dsColumns =this.dataset.length>0 ? Object.keys(this.dataset[0]):[];
          this.matchCols();
          this.num = num;
        })
      })
    }

  ngOnInit() {
      this.xuanran();
  }
  ngOnchange(){

  }

    matchCols(){
    		if(this.columns.length < 1){
    			this.columns = JSON.parse(JSON.stringify(this.dsColumns));
    		}
        for(let fitlerCol of this.filterColumns){
    			if(this.columns.indexOf(fitlerCol) > -1){
    				this.columns.splice(this.columns.indexOf(fitlerCol), 1);
    			}
    		}
        for(let hideCol of this.hideColumns){
    			if(this.columns.indexOf(hideCol) < 0){
    				this.columns.push(hideCol);
    			}
    		}
	  }

    getKeys(item){
        return item ? Object.keys(item) : [];
    }

    // 删除商品
    del(e){
        this.dataset.splice(e.target.getAttribute("data-idx"),1)
        this.http.get('backDelproduct',{id:e.target.getAttribute("data-id")}).then((res)=>{
        })
    }
    // 添加商品
    addProduct(e){
        this.http.get('backAddproduct',{cnname:this.Name,enname:this.Enname,title:this.Title,price:this.Price,number:this.Number,category:this.Category,weight:this.Weight,img:this.Img,hot:this.Hot}).then((res)=>{
            this.xuanran();
        })
    }

    // 修改商品
    UpdateProduct(){
       this.http.get('backUpdproduct',{_id:this.Id,cnname:this.Name,enname:this.Enname,title:this.Title,price:this.Price,number:this.Number,category:this.Category,weight:this.Weight,img:this.Img,hot:this.Hot}).then((res)=>{
          this.xuanran()
       })
    }
    // 修改modal数据
    changdata(e){
      let tcvalue = e.target.parentNode.parentNode.children;
      this.Name = tcvalue[0].innerText ;
      this.Enname = tcvalue[1].innerText
      this.Title = tcvalue[2].innerText;
      this.Price = tcvalue[3].innerText;
      this.Number = tcvalue[4].innerText;
      this.Weight = tcvalue[5].innerText;
      this.Category = tcvalue[6].innerText;
      this.Img = tcvalue[7].innerText;
      this.Hot = tcvalue[8].innerText;
    }
    //显示modal（模态框）
    appearModal(e,item){
        this.Id = item._id ;
        this.show = !this.show;
    }
    appearModal_1(e){
        this.Weight = 2.0;
        this.show_1 = !this.show_1;
    }

    //隐藏modal（模态框）
    hideModal(){
        this.show = !this.show;
    }
    //隐藏modal（模态框）
    hideModal_1(){
        this.show_1 = !this.show_1;
    }

    mohusearch(){
        this.searchValue = document.getElementById('search')['value'];
        this.xuanran();
    }

}
