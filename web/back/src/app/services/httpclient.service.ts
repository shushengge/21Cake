import { Injectable } from '@angular/core';
import {Http, RequestMethod, RequestOptions} from '@angular/http';

@Injectable()
export class HttpclientService {
	baseurl: string = "http://10.3.136.37:8080/";
	constructor(private http: Http) { }
	
	filterurl(url){
		if(url.startsWith('http')){
			return url;
		}
		return this.baseurl + url;
	}

	get(url: string, params?: {}){
		return new Promise((reslove, reject) => {
			// this.http.get(this.filterurl(url)).subscribe()

			// this.http.get(this.filterurl(url)).toPromise().then().catch()

			//http://localhost:88/student?_0.15451515
			params = params || {};
			params["_"] = Math.random();
			this.http.request(this.filterurl(url), new RequestOptions({
				method: RequestMethod.Get,
				search: params
			})).toPromise().then((res) => {
				reslove(res.json());
			}).catch((error) => {
				reject(error);
			})
		})

		// $.get('http://localhost:88/a', {page: 1, limit: 10, _: Math.random()});
		// http://localhost:88/a?page=1&limit=10&_=03.5452
	}
}
