import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http'

import {Utils} from '../../utils/utils'

// import {DictionaryService} from '../../services/dictionary.service'
import {HttpclientService} from '../../services/httpclient.service'


@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css','../welcome/welcome.component.css']
})
export class ProductsComponent implements OnInit {
    dataset:Array<any>;

    constructor(private http: HttpclientService) { }

    ngOnInit() {
        this.http.get('backproducts',{page:1,limit:10}).then((res)=>{
            this.dataset = res['data'];
        })
    }

    getKeys(item){
        return item ? Object.keys(item) : [];
    }

}
