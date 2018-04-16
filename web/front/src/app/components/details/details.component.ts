import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as $ from 'jquery'

import { HttpclientService } from '../../servers/httpclient.service'

@Component({
  selector: 'detail',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
	dataset: Array<any>;
	text:string = '已选择：2.0英镑';
	showSpinner: boolean = false;
	pra: object = {};
	srcLink: string = this.http.baseurl + 'temp/';
	srcDelLink: string = this.http.baseurl + 'temp/';
	proTjDataset: Array<any>;
	showAlert: boolean = false;

	constructor(private route:ActivatedRoute, private router:Router, private http: HttpclientService ) { }

	showSuspension(e,n){
		// console.log(document.getElementsByClassName('detail-suspension')[0]);
		// console.log(e.target)
		let susp = document.getElementsByClassName('detail-suspension')[0];
		// 出现隐藏内容
		if(n===1){
			susp['style']['top'] = '0';
			susp['style']['bottom'] = $('.join-cart').innerHeight()+'px';

		}else {
			susp['style']['top'] = '100%';
			susp['style']['bottom'] = '-100%';
			this.text = '已选择： ' + $('li.active').text();
		}
		
	}
	selectWeg(e){
		// console.log(e.target);
		$(e.target).addClass('active').siblings().removeClass('active')
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
			// console.log($('body'))
			// $('body').animate({scrollTop:'0'},500);
		}else {
			// console.log(item);
			this.gotoCart(e,0,id,item);
		}
	}
	
	gotoCart(e,n,id,data){
		// console.log('tocart');
		// console.log($('li.active').text());
		if(!this.pra['userid']){
			return this.router.navigate(['login']);
		}
		this.showSpinner = true;
		this.pra['productid'] = id? id : this.pra['productid']; 
		let dataset = data?  data : this.dataset;
		// console.log('id:',this.pra['productid']);
		this.pra['qty'] = 1;
		this.pra['weg'] = $('li.active').text();
		if(!id){
			this.showSuspension(e,0);
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
							// if(res['status']){
								this.showSpinner = false;

								if(n===1){
									this.router.navigate(['car']);
								}else {
									// alert('成功加入购物车！');
									this.showAlert = true;
									setTimeout(()=>{
										this.showAlert = false;
									},1000)
								}

							// }
						})
						break;
					}
				}
				if(i==res['data'].length){
					// 插入购物车
					this.http.get('addCart',this.pra).then((res)=>{
						// console.log(res);
						if(res['status']){
							this.showSpinner = false;
							
							if(n===1){
								this.router.navigate(['car']);
							}else {
								// alert('成功加入购物车！');
								this.showAlert = true;
								setTimeout(()=>{
									this.showAlert = false;
								},1000)
							}
						}
					})
				}
			}else {
				this.http.get('addCart',this.pra).then((res)=>{
					// console.log(res);
					if(res['status']){
						this.showSpinner = false;
						
						if(n===1){
							this.router.navigate(['car']);
						}else {
							// alert('成功加入购物车！');
							this.showAlert = true;
							setTimeout(()=>{
								this.showAlert = false;
							},1000)
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
		this.pra['userid'] = window.sessionStorage.getItem('userid');
		this.pra['username'] = window.sessionStorage.getItem('username');

		this.route.params.subscribe((params) => {
            // console.log(params);
            if(params['id']){
            	// 当前商品的id
            	this.pra['productid'] = params['id'];
            	this.http.get('frontIdproduct',{id: params['id']}).then((res)=>{
					this.dataset = res['data'][0];
					// srcLink返回默认样式
					this.srcLink = this.http.baseurl + "temp/";
					this.srcLink += res['data'][0]['img'];
					// console.log(this.srcLink);
					this.http.get('frontProducts').then((res)=>{
						// console.log(res);
						this.proTjDataset = this.randomPro(res['data']);
						// console.log(this.proTjDataset);
					})
				})

            }
            // else {
            // 	this.router.navigate(['login'])
            // }
        });
		
		
	}

}
