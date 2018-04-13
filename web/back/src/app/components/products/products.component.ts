import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http'
import {Utils} from '../../utils/utils'

// import {DictionaryService} from '../../services/dictionary.service'
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
    dataset:Array<any>;
    dsColumns: Array<string> = [];
  	columns: Array<string> = [];
  	filterColumns: Array<string> = [];
  	hideColumns: Array<string> = [];
  	// columnsAttributes: Object = {};
  	// searchConfig: Object = {};

    constructor(private http: HttpclientService) { }

    ngOnInit() {
        this.xuanran();
    }
    xuanran(){
      this.http.get('http://localhost:4200/assets/config/products.txt').then((config)=>{
        // console.log(config)
        if(config['cols']){
        this.columns = config['cols'].split(',');
      }
      if(config['filterCols']){
        this.filterColumns = config['filterCols'].split(',');
      }
      if(config['hideCols']){
        this.hideColumns = config['hideCols'].split(',');
      }
      this.http.get('backproducts',{page:1,limit:56}).then((res)=>{
        this.dataset = res['data'];
        this.dsColumns = Object.keys(this.dataset[0]);
        this.matchCols();
      })
    })
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

    del(e){
        this.dataset.splice(e.target.getAttribute("data-idx"),1)
        this.http.get('backDelproduct',{id:e.target.getAttribute("data-id")}).then((res)=>{
        })
    }
    addProduct(e){
        // this.dataset.push()
        this.http.get('backAddproduct').then((res)=>{
            console.log(res)
            // this.xuanran();
        })
    }

}
