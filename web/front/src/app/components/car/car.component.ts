import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as $ from 'jquery'

import { HttpclientService } from '../../servers/httpclient.service'

@Component({
  selector: 'car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent implements OnInit {

	constructor(private route:ActivatedRoute, private router:Router, private http: HttpclientService, private ref: ChangeDetectorRef ) { }

	// userid: string = '5acb0486cc8fa3dce16177f9';
	userid: string;
	carDataset: Array<any>;
	srcLink: string = this.http.baseurl + 'temp/';
	arrUserid: Array<any>;
	arrProId: Array<any>= [];
	arrQty: Array<number>= [];
	showSpinner: boolean = false;
	showDel:Array<boolean>=[];
	totalPrice: number = 0;
	currentPrice: number;
	pra: object = {userid:'5acb0486cc8fa3dce16177f9',username: 'user1'}
	dataset: Array<any> = [];
	proTjDataset: Array<any>;
	srcDelLink: string = this.http.baseurl + 'temp/';
	showCar: boolean = false;


	delAll(e){
		// console.log(this.arrProId);
		let str: string = '';
		for(let i=0;i<this.arrProId.length;i++){
			str += this.arrProId[i] + ',';
		}
		str = str.slice(0,-1);
		console.log(str);
		this.http.get('removeInArr',{userid: this.userid, productArr: str}).then((res)=>{
			// console.log(res);
			if(res['status']){
				this.carDataset = null;
				console.log(Boolean([]);
			}
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
		// 改变数量
		this.carDataset[n]['qty'] = this.arrQty[n];
		this.http.get('updateCartQty',{userid: this.userid, productid: this.carDataset[n]['productid'],qty: this.arrQty[n] }).then((res)=>{
			if(Number($('input.val')[n]['value']) == 1){
				return this.showDel[n] = true;
			}else{
				this.showDel[n] = false;
			}
		})
		// console.log(this.arrQty,this.arrQty[n]);
		
	}
	changePic(){
		for(let i=0;i<this.carDataset.length;i++){
			if(this.carDataset[i]['qty'] == 1){
				this.showDel[i] = true;
			}else {
				this.showDel[i] = false;
			}
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

	gotoOrder(e){
		// console.log(e.target);
		let order:object = {};
		order['userid'] = this.userid;
		order['status'] = 0;
		order['products'] = this.carDataset;
		console.log(order);
		this.http.get('userOrder',{userid: this.userid, status: 0}).then((res)=>{
			if(res['status']){
				if(res['data'].length > 0){
					// 更新订单
					this.http.get('proUpdate',{userid:order['userid'], status: order['status'], products: order['products']}).then((res)=>{
						if(res['status']){
							// 跳转到order页面
						}
					})
				}else {
					// 插入订单数据
					this.http.get('insertOrder',order).then((res)=>{
						if(res['status']){
							// 跳转到order页面
							console.log('tiaozhuan')
						}
					})
				}
			}
		})
		
	}
	delPro(e,id,idx){
		console.log(idx);
		this.http.get('removeCart',{userid: this.userid, productid: id}).then((res)=>{
			this.carDataset.splice(idx,1);
			console.log(this.carDataset);
		})
	}


	randomPro(arrData){
		let arr: Array<any> = [];
		for(let i=0;i<4;i++){
			let sj = Number(arrData.length);
			let num = Math.floor(Math.random()*sj);
			// console.log(num)
			arr[i] = arrData[num];
			arrData.splice(num,1);

		}
		return arr;
	}

	gotoDetail(e,id,item){
		// console.log($(e.target).hasClass('recommend-cart'),id);
		if(!$(e.target).hasClass('recommend-cart')){
			this.router.navigate(['details/' + id]);
		}else {
			// console.log(item);
			this.gotoCart(e,0,id,item);
		}
	}

	gotoCart(e,n,id,data){
		console.log(data);
		// console.log($('li.active').text());
		this.showSpinner = true;
		this.pra['productid'] = id? id : this.pra['productid']; 
		let dataset = data?  data : this.dataset;
		// console.log('id:',this.pra['productid']);
		this.pra['qty'] = 1;
		this.pra['weg'] = $('li.active').text();
		if(!id){
			
			this.pra = Object.assign({},dataset,this.pra);
		}else {
			this.pra = Object.assign({},this.pra,dataset);

		}
		
		// console.log(this.pra);
		this.http.get('userCart',{userid:this.pra['userid']}).then((res)=>{
			// console.log(res);
			if(res['status']){
				for(var i=0;i<res['data'].length;i++){
					if(res['data'][i]['productid'] == this.pra['productid']){
						console.log('same');
						// 购物车已存在该商品则只增加数量
						this.pra['qty'] += res['data'][i]['qty'];
						// 更新购物车信息
						this.http.get('updateCartQty',this.pra).then((res)=>{
							// console.log(res);
							if(res['status']){
								this.showSpinner = false;

								if(n===1){
									this.router.navigate(['car']);
								}else {
									alert('成功加入购物车！');
								}

							}
						})
						break;
					}
				}
				if(i==res['data'].length){
					// 插入购物车
					this.http.get('addCart',this.pra).then((res)=>{
						// console.log(res);
						if(res['status']){
							this.arrProId.push(data['_id'])
							this.showSpinner = false;
							this.carDataset.push(this.pra);
							if(n===1){
								this.router.navigate(['car']);
							}else {
								alert('成功加入购物车！');
								this.changePic();

							}
						}
					})
				}
			}else {
				this.http.get('addCart',this.pra).then((res)=>{
						// console.log(res);
					if(res['status']){
						this.arrProId.push(data['_id'])

						this.showSpinner = false;
						if(this.carDataset){
							this.carDataset.push(this.pra);
						}else {
							this.carDataset = [];
							this.carDataset[0] = this.pra;
						}
						if(n===1){
							this.router.navigate(['car']);
						}else {
							alert('成功加入购物车！');
							this.changePic();

						}
					}
				})
			}
		})
		// this.http.get('addCart',this.pra).then((res)=>{
		// 	console.log(res);
		// 	if(res['status']){
		// 		this.showSpinner = false;
				
		// 		if(n===1){
		// 			this.router.navigate(['car']);
		// 		}else {
		// 			alert('成功加入购物车！');
		// 		}
		// 	}
		// })
	}


	ngOnInit() {
		console.log( window.sessionStorage.getItem('userid'));
		this.userid = window.sessionStorage.getItem('userid');
		this.http.get('userCart',{userid: this.userid}).then((res)=>{
			// console.log(res);
			this.showCar = true;
			this.http.get('frontProducts').then((res)=>{
				// console.log(res);
				this.proTjDataset = this.randomPro(res['data']);
				// console.log(this.proTjDataset);
			})
			if(res['status']){
				this.carDataset = res['data'];
				// console.log(this.carDataset.length)
				for(let i=0;i<this.carDataset.length;i++){
					if(this.carDataset[i]['qty'] == 1){
						this.showDel[i] = true;
					}else {
						this.showDel[i] = false;
					}
					this.arrProId.push(this.carDataset[i]['productid'])
					this.arrQty.push(this.carDataset[i]['qty'])

					this.totalPrice += this.carDataset[i]['qty'] * this.carDataset[i]['price'];
				}
				
				// console.log(this.arrProId,this.arrQty);
				// this.http.get('frontIdproduct',{id:})
				
			}else if(res['error']){
				this.router.navigate(['login'])
			}else{
				// 购物车显示为空

			}
		})
	}

}
