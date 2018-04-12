import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as $ from 'jquery'

import { HttpclientService } from '../../servers/httpclient.service'

@Component({
  selector: 'car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent implements OnInit {

	constructor(private route:ActivatedRoute, private router:Router, private http: HttpclientService ) { }

	userid: string = '5acb0486cc8fa3dce16177f9';
	carDataset: Array<any>;
	srcLink: string = this.http.baseurl + 'temp/';
	arrUserid: Array<any>;
	arrProId: Array<any>= [];
	arrQty: Array<number>= [];

	showDel:Array<boolean>=[];
	totalPrice: number = 0;
	currentPrice: number;

	delAll(e){
		// console.log(this.arrProId);
		let str: string = '';
		for(let i=0;i<this.arrProId.length;i++){
			str += this.arrProId[i] + ',';
		}
		str = str.slice(0,-1);
		console.log(str);
		this.http.get('removeInArr',{userid: this.userid, productArr: str}).then((res)=>{
			console.log(res);
		})

	}
	changeQty(e,n,s){
		// console.log(n);
		if(s==1){
			$('input.val')[n]['value'] = String(Number($('input.val')[n]['value']) + 1);
		}else {
			$('input.val')[n]['value'] = String(Number($('input.val')[n]['value']) - 1);
		}
		this.arrQty[n] = Number($('input.val')[n]['value']);
		// 改变总价格
		this.totalPrice = this.sum(this.carDataset,this.arrQty);
		console.log(this.arrQty,this.arrQty[n]);
		if(Number($('input.val')[n]['value']) == 1){
			return this.showDel[n] = true;
		}else{
			this.showDel[n] = false;
		}
		
	}
	// decreaseQty(e,n){
	// 	// console.log(n);
	// 	$('input.val')[n]['value'] = String(Number($('input.val')[n]['value']) - 1);
	// 	this.arrQty[n] = Number($('input.val')[n]['value']);
	// 	console.log(this.arrQty,this.arrQty[n]);

	// 	if(Number($('input.val')[n]['value']) == 1){
	// 		return this.showDel[n] = true;
	// 	}else{
	// 		this.showDel[n] = false;
	// 	}

	// 	// console.log($('input.val')[n]['value'])
		

	// }
	sum(dataset,arrQty){
		let total: number = 0;
		for(let i=0;i<dataset.length;i++){
			// this.showDel[i] = false;
			// console.log(this.carDataset[i]['qty'] * this.carDataset[i]['price'])
			total += arrQty[i] * dataset[i]['price'];
			// console.log(total);

		}
		return total;
	}

	ngOnInit() {
		this.http.get('userCart',{userid: this.userid}).then((res)=>{
			console.log(res);
			this.carDataset = res['data'];
			// console.log(this.carDataset.length)
			for(let i=0;i<this.carDataset.length;i++){
				this.showDel[i] = false;
				this.arrProId.push(this.carDataset[i]['_id'])
				this.arrQty.push(this.carDataset[i]['qty'])

				this.totalPrice += this.carDataset[i]['qty'] * this.carDataset[i]['price'];
			}
			// console.log(this.arrProId,this.arrQty);
			// this.http.get('frontIdproduct',{id:})
		})
	}

}
