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
	constructor(private route:ActivatedRoute, private router:Router, private http: HttpclientService ) { }

	showSuspension(e,n){
		// console.log(document.getElementsByClassName('detail-suspension')[0]);
		// console.log(e.target)
		let susp = document.getElementsByClassName('detail-suspension')[0];
		if(n===1){
			susp['style'].top = '0';
		}else {
			susp['style'].top = '100%';
		}
		
	}
	selectWeg(e){
		console.log(e.target);
		$(e.target).addClass('active').siblings().removeClass('active')
	}

	

	ngOnInit() {
		// this.http.get('frontIdproduct',{id: '5acacaf5cc8fa3dce16174d5'}).then((res)=>{
		// 	console.log(res);
		// 	this.dataset = res['data'];
		// })
		
	}

}
